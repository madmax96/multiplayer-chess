/*
    Receive:{
        timestamp:number,
      }
*/

module.exports = (data, ws, wss) => {
  const { timestamp } = data;
  const room = wss.gameRooms[ws.roomId];
  const playerSending = room[ws.isWhite ? 'white' : 'black'];

  const winner = ws.isWhite ? 'black' : 'white';

  playerSending.lastAck = timestamp;
  playerSending.tempRemainingTime = playerSending.timeRemaining;
  playerSending.timer = setInterval(() => {
    playerSending.tempRemainingTime -= 1000;
    if (playerSending.tempRemainingTime <= 0) {
      clearInterval(playerSending.timer);
      playerSending.timer = null;
      room.white.socket.send(JSON.stringify({
        event: 'winner',
        data: { winner },
      }));
      room.black.socket.send(JSON.stringify({
        event: 'winner',
        data: { winner },
      }));
    }
  }, 1000);
};

