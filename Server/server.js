require('./config/config.js');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const express = require('express');
const app = express();
const httpRouter = require('./httpRouter/index');
const bodyParser = require('body-parser');
const CustomEvents = require('./eventControllers/CustomEvents');
const User = require('./models/User');
require('./database/connect');

const server = http.createServer(app);
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(httpRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(process.env.PORT, () => {
  console.log('Listening on %d', process.env.PORT);
});

const wss = new WebSocket.Server({
  server,
  verifyClient: (info, callback) => {
    const token = info.req.url.slice(1);

    User.findByToken(token).then((user) => {
      if (!user) {
        callback(false, 401);
      }

      info.req.user = user;

      callback(true, 200);
    }).catch(() => {
      callback(false, 401);
    });
  },
});

const customEvents = new CustomEvents();

wss.on('connection', (ws, request) => {
  ws.user = request.user;
  
});



