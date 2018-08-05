class CustomEvents {
  constructor() {
    this.registeredEvents = {};
  }

  on(event, callback) {
    this.registeredEvents[event] = callback;
  }

  eventHandler(message, ws, wss) {
    const messageObj = JSON.parse(message);
    const handler = this.registeredEvents[messageObj.event];
    if (handler) {
      handler(messageObj.data, ws, wss);
    }
  }
}

module.exports = CustomEvents;
