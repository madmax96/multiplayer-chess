require('./config/config.js');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const express = require('express');

const app = express();
const CustomEvents = require('./eventControllers/CustomEvents');

const server = http.createServer(app);
const publicPath = path.join(__dirname, '..', 'public');
const moveEvent = require('./eventControllers/moveEvent');
const ackMessageEvent = require('./eventControllers/ackMessageEvent');
const startEvent = require('./eventControllers/startEvent');
const reconnectionEvent = require('./eventControllers/reconnectionEvent');
const surrenderEvent = require('./eventControllers/surrenderEvent');

app.use(express.static(publicPath));


app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(process.env.PORT, () => {
  console.log('Listening on %d', process.env.PORT);
});

const wss = new WebSocket.Server({
  server,
});


function heartbeat() {
  this.isAlive = true;
}
function noop() {}
setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 5000);


const customEvents = new CustomEvents();
customEvents.on('move', moveEvent);
customEvents.on('ack', ackMessageEvent);
customEvents.on('start', startEvent);
customEvents.on('reconnect', reconnectionEvent);
customEvents.on('surrender', surrenderEvent);


wss.whitePlayer = null;
wss.gameRooms = {};
wss.on('connection', (ws) => {
  console.log(wss.clients.size);
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('message', message => customEvents.eventHandler(message, ws, wss));
  ws.on('error', (e) => {
    console.log('error ', e);
  });

  ws.on('close', () => {
    if (ws === wss.whitePlayer) {
      wss.whitePlayer = null;
    } else if (ws.roomId) {
      const {
        roomId,
        figure,
      } = ws;
      const room = wss.gameRooms[roomId];
      const player = figure; // player who is closing
      const sendTo = player ? 0 : 1;

      room[player].socket = null;
      if (room[sendTo].socket) {
        room[sendTo].socket.send(JSON.stringify({
          event: 'oponentGone',
        }));
        room.reconnectionTimer = setTimeout(() => {
          room[sendTo].socket.send(JSON.stringify({
            event: 'winner',
            data: { winner: sendTo },
          }));
          if (room[0].timer) {
            clearTimeout(room[0].timer);
          }
          if (room[1].timer) {
            clearTimeout(room[1].timer);
          }
          delete wss.gameRooms[roomId];
        }, 60000);
      } else {
        // if both players disconnect clear all intervals and destroy the game
        clearTimeout(room.reconnectionTimer);
        if (room[0].timer) {
          clearTimeout(room[0].timer);
        }
        if (room[1].timer) {
          clearTimeout(room[1].timer);
        }
        delete wss.gameRooms[roomId];
      }
    }
    console.log('closed');
  });
});

module.exports = {
  wss,
};
