/*
    Receive:{
        timestamp:number,
        gameBoard:string;
    }
*/

module.exports = (data, ws, wss) => {
  const {
    timestamp, gameBoard,
  } = data;
  const playerSending = ws.isWhite ? 'white' : 'black';
  const sendToPlayer = ws.isWhite ? 'black' : 'white';
  const room = wss.gameRooms[ws.roomId];

  if (playerSending == room.onMove) {
    const timePlayed = timestamp - room[playerSending].lastAck;
    room[playerSending].timeRemaining -= timePlayed;
    clearInterval(room[playerSending].timer);
    room[playerSending].timer = null;
    room.gameBoard = gameBoard;
    room.onMove = sendToPlayer;
    room[sendToPlayer].socket.send(JSON.stringify({
      event: 'move',
      data: {
        gameBoard,
        oponentRemainingTime: room[playerSending].timeRemaining,
      },
    }));
  }
};

