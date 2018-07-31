require('./config/config.js');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const express = require('express');
const uuidv1 = require('uuid/v1');

const app = express();
const CustomEvents = require('./eventControllers/CustomEvents');

const server = http.createServer(app);
const publicPath = path.join(__dirname, '..', 'public');
const moveEvent = require('./eventControllers/moveEvent');
const ackMessageEvent = require('./eventControllers/ackMessageEvent');

app.use(express.static(publicPath));


app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(process.env.PORT, () => {
  console.log('Listening on %d', process.env.PORT);
});

const wss = new WebSocket.Server({
  server,
  verifyClient: (info, callback) => {
    const userName = info.req.url.slice(1);
    if (userName) {
      info.req.userName = userName;
      callback(true, 200);
    } else {
      callback(false, 400);
    }
  },
});


function noop() {}

function heartbeat() {
  this.isAlive = true;
}
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

wss.whitePlayer = null;
wss.gameRooms = {};
wss.on('connection', (ws, request) => {
  ws.isAlive = true;
  ws.userName = request.userName;
  ws.on('pong', heartbeat);
  ws.on('message', message => customEvents.eventHandler(message, ws, wss));
  ws.on('error', () => {
    console.log('error');
  });
  ws.on('close', () => {
    if (ws == wss.whitePlayer) {
      wss.whitePlayer = null;
    } else {
      const {
        roomId,
        isWhite,
      } = ws;
      const room = wss.gameRooms[roomId];
      const player = isWhite ? 'white' : 'black';
      const sendTo = isWhite ? 'black' : 'white';
      room[player].socket = null;
      room[sendTo].socket.send(JSON.stringify({
        event: 'oponentGone',
      }));
    }
  });

  const {
    whitePlayer,
  } = wss;
  if (!whitePlayer) {
    wss.whitePlayer = ws;
    ws.isWhite = true;
  } else {
    ws.isWhite = false;
    // connect players and start the game
    const roomId = uuidv1();
    ws.roomId = roomId;
    whitePlayer.roomId = roomId;
    wss.gameRooms[roomId] = {
      white: {
        socket: whitePlayer,
        timeRemaining: 900000,
      },
      black: {
        socket: ws,
        timeRemaining: 900000,
      },
      onMove: 'white',
      gameBoard: null,
    };

    ws.send(JSON.stringify({
      event: 'gameStart',
      data: {
        isWhite: false,
        roomId,
      },
    }));

    whitePlayer.send(JSON.stringify({
      event: 'gameStart',
      data: {
        isWhite: true,
        roomId,
      },
    }));
    wss.whitePlayer = null;
  }
});

module.exports = {
  wss,
};
