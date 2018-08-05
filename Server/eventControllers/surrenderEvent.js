const WebSocket = require('ws');

module.exports = (_, ws, wss) => {
  const { roomId, figure } = ws;
  const room = wss.gameRooms[roomId];
  const winner = figure ? 0 : 1;
  const { socket } = room[winner];
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      event: 'surrender',
    }));
  }

  if (room[0].timer) {
    clearTimeout(room[0].timer);
  }
  if (room[1].timer) {
    clearTimeout(room[1].timer);
  }
  delete wss.gameRooms[roomId];
};
