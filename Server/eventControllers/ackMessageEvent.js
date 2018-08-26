/*
    Receive:{
        timestamp:number,
      }
*/

module.exports = (data, ws, wss) => {
  const { timestamp } = data;
  const room = wss.gameRooms[ws.roomId];
  const playerSending = room[ws.figure];

  playerSending.lastAck = timestamp;
  playerSending.timer = setTimeout(() => {
    playerSending.timer = null;
    room[1].socket.send(JSON.stringify({
      event: 'timer',
    }));
    room[0].socket.send(JSON.stringify({
      event: 'timer',
    }));
  }, playerSending.timeRemaining);
};
