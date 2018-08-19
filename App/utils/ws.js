export default class WSocket {
  constructor(url) {
    this.socket = null;
    this.url = url;
    this.registeredEvents = {};
  }

  connect(token = '') {
    return new Promise((res, rej) => {
      try {
        this.socket = new WebSocket(`${this.url}/${token}`);
      } catch (e) {
        rej(e);
      }
      this.socket.onerror = (e) => {
        rej(e);
      };
      this.socket.onopen = () => {
        this.socket.onmessage = (message) => {
          const messageData = JSON.parse(message.data);
          const serverEvent = messageData.event;
          alert(serverEvent);
          const {
            data,
          } = messageData;
          if (this.registeredEvents[serverEvent]) {
            this.registeredEvents[serverEvent](data);
          }
        };
        this.socket.onclose = () => {
          this.registeredEvents.ws_close();
        };
        window.onunload = () => {
          this.closeConnection();
        };
        res();
      };
    });
  }

  on(event, callback) {
    this.registeredEvents[event] = callback;
  }

  emmit(event, data) {
    this.socket.send(JSON.stringify({
      event,
      data,
    }));
  }

  closeConnection() {
    this.socket.close();
  }
}
