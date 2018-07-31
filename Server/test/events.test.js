const expect = require('expect');
const { sockets } = require('./connection.test');
const { wss } = require('../server');
const { sleep } = require('../utils');

// afterEach(() => {
//   sockets.forEach((socket) => {
//     socket.onmessage = null;
//   });
// });

describe('game events ', () => {
  it('should receive white players move and send it to black', async () => {
    const now = Date.now();
    sockets[0].send(JSON.stringify({
      event: 'move',
      data: {
        timestamp: now,
        gameBoard: 'boardJsonString',
      },
    }));

    const user2Message = await new Promise((resolve) => {
      sockets[1].onmessage = ({ data }) => {
        sockets[1].messageReceivedAt = Date.now();
        resolve(data);
      };
    });
    const parsed = JSON.parse(user2Message);
    const { event, data } = parsed;
    expect(event).toBe('move');
    expect(data.gameBoard).toBe('boardJsonString');
    const { messageReceivedAt } = sockets[0];
    expect(data.oponentRemainingTime).toBe(900000 - (now - messageReceivedAt));
  });

  it('should start black timer / white player timer should be null', async () => {
    const room = wss.gameRooms[sockets[0].roomId];
    const { timer: whiteTimer } = room.white;
    expect(whiteTimer).toBe(null);
    sockets[1].send(JSON.stringify({ event: 'ack', data: { timestamp: sockets[1].messageReceivedAt } }));
    await sleep(0.1);
    const { timer: blackTimer } = room.black;
    expect(typeof blackTimer).toBe('object');
  });

  it('should send game over if players clock expires', async function t() {
    const room = wss.gameRooms[sockets[0].roomId];
    this.timeout(5000);
    room.black.tempRemainingTime = 500;

    const user1Message = await new Promise((resolve) => {
      sockets[0].onmessage = ({ data }) => {
        sockets[1].onmessage = null;
        resolve(data);
      };
    });
    const parsed = JSON.parse(user1Message);
    const { event, data: { winner } } = parsed;
    expect(event).toBe('winner');
    expect(winner).toBe('white');
  });
});
