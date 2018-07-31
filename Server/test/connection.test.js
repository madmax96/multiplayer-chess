// REFACTOR TESTS SO THAT NO STATE IS SHARED :)
const expect = require('expect');
const WebSocket = require('ws');
const { wss } = require('./../server');

const { sleep } = require('../utils');

const userNames = ['user1', 'user2', 'user3'];
const sockets = [];
afterEach(() => {
  sockets.forEach((socket) => {
    socket.onmessage = null;
  });
});
describe('WebSocket Server connection', () => {
  it(
    'should  connect users to WebSocket Server and start the game.',
    async function wssTest() {
      this.timeout(10000);
      let socket;
      userNames.forEach(async (name) => {
        socket = new WebSocket(`ws://localhost:${process.env.PORT}/${name}`);
        sockets.push(socket);
        await new Promise((resolve, reject) => {
          socket.onopen = function onopen() {
            resolve();
          };
          socket.onerror = function onerror(e) {
            reject(e);
          };
        });
      });

      const user1Message = await new Promise((resolve) => {
        sockets[0].onmessage = ({ data }) => {
          // remember message receiving timestamp for later testing purpose
          sockets[0].messageReceivedAt = Date.now();
          resolve(data);
        };
      });
      const user2Message = await new Promise((resolve) => {
        sockets[1].onmessage = ({ data }) => {
          resolve(data);
        };
      });

      // brackets are for block scoping
      // inspect white player data
      {
        expect(wss.clients.size).toBe(3);
        expect(wss.whitePlayer.userName).toBe(userNames[2]);

        expect(typeof user1Message).toBe('string');
        const parsed = JSON.parse(user1Message);
        const { event, data } = parsed;
        expect(event).toBe('gameStart');
        expect(data.roomId).toBeDefined();
        sockets[0].roomId = data.roomId;
        expect(data.isWhite).toBe(true);
      }

      // inspect black player data
      expect(typeof user2Message).toBe('string');
      const parsed = JSON.parse(user2Message);
      const { event, data } = parsed;
      expect(event).toBe('gameStart');
      expect(data.roomId).toBeDefined();
      sockets[1].roomId = data.roomId;
      expect(sockets[0].roomId).toEqual(sockets[1].roomId);
      expect(data.isWhite).toBe(false);

      const gameRoom = wss.gameRooms[data.roomId];
      expect(gameRoom).toMatchObject({
        white: { timeRemaining: 900000 },
        black: { timeRemaining: 900000 },
        onMove: 'white',
        gameBoard: null,
      });
      expect(gameRoom).toHaveProperty('white.socket');
      expect(gameRoom).toHaveProperty('black.socket');
    },
  );

  it('should receive ack and start timer', async function ackTest() {
    this.timeout(5000);
    sockets[0].send(JSON.stringify({ event: 'ack', data: { timestamp: sockets[0].messageReceivedAt } }));
    await sleep(2.1);
    const whiteTimer = wss.gameRooms[sockets[0].roomId].white.timer;

    expect(typeof whiteTimer).toBe('object');
  });
});

module.exports = { sockets, userNames };
