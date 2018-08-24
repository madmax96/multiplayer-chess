/*
    Receive:{
       name:string
    }
*/


const uuidv1 = require('uuid/v1');

module.exports = (data, ws, wss) => {
  const { whitePlayer } = wss;
  const { name } = data;
  ws.name = name;
  if (!whitePlayer) {
    wss.whitePlayer = ws;
    ws.figure = 1;
  } else {
    ws.figure = 0;
    // connect players and start the game
    const roomId = uuidv1();
    ws.roomId = roomId;
    whitePlayer.roomId = roomId;
    wss.gameRooms[roomId] = {
      1: {
        socket: whitePlayer,
        timeRemaining: 900000,
        timer: null,
        lastAck: null,
      },
      0: {
        socket: ws,
        timeRemaining: 900000,
        timer: null,
        lastAck: null,
      },
      onMove: 1, // 1 for white 0 for black
      gameBoard: null,
      reconnectionTimer: null,
    };

    ws.send(JSON.stringify({
      event: 'gameStart',
      data: {
        figure: 0,
        roomId,
        opponentName: whitePlayer.name,
      },
    }));

    whitePlayer.send(JSON.stringify({
      event: 'gameStart',
      data: {
        figure: 1,
        roomId,
        opponentName: ws.name,
      },
    }));
    wss.whitePlayer = null;
  }
};
