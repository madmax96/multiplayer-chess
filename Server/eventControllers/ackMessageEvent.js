/*
    Receive:{
        timestamp:number,
      }
*/

module.exports = (data, ws, wss) => {
  const { timestamp } = data;
  const room = wss.gameRooms[ws.roomId];
  const playerSending = room[ws.figure];

  const winner = ws.figure ? 0 : 1; // if time expires for current player we have a winner

  playerSending.lastAck = timestamp;
  playerSending.timer = setTimeout(() => {
    playerSending.timer = null;
    room[1].socket.send(JSON.stringify({
      event: 'winner',
      data: { winner },
    }));
    room[0].socket.send(JSON.stringify({
      event: 'winner',
      data: { winner },
    }));
  }, playerSending.timeRemaining);
};
