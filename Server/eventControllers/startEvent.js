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
      gameBoard: {
        '00': 'r',
        '01': 'n',
        '02': 'b',
        '03': 'q',
        '04': 'k',
        '05': 'b',
        '06': 'n',
        '07': 'r',
        '10': 'p',
        '11': 'p',
        '12': 'p',
        '13': 'p',
        '14': 'p',
        '15': 'p',
        '16': 'p',
        '17': 'p',
        '60': 'P',
        '61': 'P',
        '62': 'P',
        '63': 'P',
        '64': 'P',
        '65': 'P',
        '66': 'P',
        '67': 'P',
        '70': 'R',
        '71': 'N',
        '72': 'B',
        '73': 'Q',
        '74': 'K',
        '75': 'B',
        '76': 'N',
        '77': 'R',
      },
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
