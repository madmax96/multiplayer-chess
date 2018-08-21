import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'normalize.css/normalize.css';
import image from '../public/background.jpeg';
import WS from './utils/ws';
import StartGameForm from './components/StartGame';
import Game from './components/Game';

const FixedBackground = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  background:url(${image});
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center center;
  overflow:hidden;
  z-index:-1000;
  &:after{
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    background-color:rgba(0,0,0,.45);
  }
`;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      gameData: {},
    };
    this.connect = this.connect.bind(this);
  }

  componentWillMount() {
    this.ws = new WS('ws://localhost:3000');
    this.ws.connect().then(() => {
      this.ws.on('gameStart', (gameData) => {
        if (gameData.figure == 1) {
          this.ws.emmit('ack', { timestamp: Date.now() });
        }
        // localStorage.setItem('gameData', JSON.stringify(gameData));
        this.setState({
          gameStarted: true,
          gameData,
        });
      });
    }).catch(() => {
      alert('Connection to server failed. Please try again later!');
    });
  }

  connect(name) {
    this.ws.emmit('start', { name });
  }

  render() {
    const { gameStarted, gameData: { figure, opponentName, roomId } } = this.state;
    return (
      <div>
        <FixedBackground />
        {gameStarted ? (
          <Game isWhite={figure == 1} oponentName={opponentName} roomId={roomId} socket={this.ws} />
        ) : <StartGameForm connect={this.connect} />}
      </div>
    );
  }
}
ReactDOM.render(
  (
    <App />
  ), document.getElementById('app'),
);
