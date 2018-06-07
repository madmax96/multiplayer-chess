require('./config/config.js');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const express = require('express');
const app = express();
const CustomEvents = require('./eventControllers/CustomEvents');
const server = http.createServer(app);
const publicPath = path.join(__dirname, '..', 'public');

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
    if(!!userName){
      info.req.userName = userName;
      callback(true,200)
    }else{
      callback(false,400);
    }
  },
});

const customEvents = new CustomEvents();

wss.on('connection', (ws, request) => {
  ws.userName = request.userName;
  
});



