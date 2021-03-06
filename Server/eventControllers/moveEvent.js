/*
    Receive:{
        timestamp:number,
        gameBoard:json string;
        move:{
          from:"ij",
          to:"kl"
        }
    }
*/

module.exports = (data, ws, wss) => {
  const {
    timestamp, gameBoard, move,
  } = data;
  const playerSending = ws.figure;
  const sendToPlayer = playerSending ? 0 : 1;
  const room = wss.gameRooms[ws.roomId];

  if (playerSending == room.onMove) {
    clearTimeout(room[playerSending].timer);
    const timePlayed = timestamp - room[playerSending].lastAck;
    room[playerSending].timeRemaining -= timePlayed;
    room[playerSending].timer = null;
    room.gameBoard = gameBoard;
    room.onMove = sendToPlayer;
    room[sendToPlayer].socket && room[sendToPlayer].socket.send(JSON.stringify({
      event: 'move',
      data: {
        move,
        opponentRemainingTime: room[playerSending].timeRemaining, // for synchronisation on frontend
        myRemainingTime: room[sendToPlayer].timeRemaining,
      },
    }));
  }
};
