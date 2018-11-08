/*
    Receive:{
       roomId: string
       figure: 0 or 1
    }
*/

module.exports = (data, ws, wss) => {
  const { roomId, figure } = data;
  if (!wss.gameRooms[roomId]) {
    return ws.send(JSON.stringify({ event: 'reconnection', data: { success: false } }));
  }
  ws.roomId = roomId;
  ws.figure = figure;
  const room = wss.gameRooms[roomId];
  clearTimeout(room.reconnectionTimer);
  const opponent = figure ? 0 : 1;
  room[figure].socket = ws;
  const toSend = {
    event: 'reconnection',
    data: {
      success: true,
      gameBoard: room.gameBoard,
      opponentRemainingTime: room[opponent].timeRemaining,
      myRemainingTime: room[figure].timeRemaining,
      onMove: room.onMove == figure,
    },
  };

  ws.send(JSON.stringify(toSend));
  room[opponent].socket.send(JSON.stringify({ event: 'oponentReconnected' }));
};
