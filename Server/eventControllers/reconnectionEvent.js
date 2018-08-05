/*
    Receive:{
       roomId:string
    }
*/

module.exports = (data, ws, wss) => {
  const { roomId, figure } = data;
  if (!wss.gameRooms[roomId]) {
    ws.send(JSON.stringify({ event: 'reconnection', data: { success: false } }));
    return;
  }

  const room = wss.gameRooms[roomId];
  clearTimeout(room.reconnectionTimer);
  const connectedPlayer = figure ? 0 : 1;
  room[figure].socket = ws;
  const toSend = {
    event: 'reconnection',
    data: {
      success: true,
    },
  };
  if (room.onMove === figure && !room[figure].timer) {
    toSend.data.gameBoard = room.gameBoard;
  }
  ws.send(JSON.stringify(toSend));
  room[connectedPlayer].socket.send(JSON.stringify({ event: 'oponentReconnected' }));
};
