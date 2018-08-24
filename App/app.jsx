import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
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
const FullHeight = styled.div`
  height:100vh;
  overflow: hidden;
`;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,

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
        this.gameData = gameData;
        this.setState({
          gameStarted: true,
        });
      });
    }).catch(() => {
      alert('Connection to server failed. Please try again later!');
    });
  }

  connect(name) {
    this.myName = name;
    this.ws.emmit('start', { name });
  }

  render() {
    const { gameStarted } = this.state;
    const { figure, opponentName, roomId } = this.gameData || {};
    return (
      <FullHeight>
        <FixedBackground />
        {gameStarted ? (
          <Game
            isWhite={figure == 1}
            opponentName={opponentName}
            myName={this.myName}
            roomId={roomId}
            socket={this.ws}
          />
        ) : <StartGameForm connect={this.connect} />}
      </FullHeight>
    );
  }
}
ReactDOM.render(
  (
    <App />
  ), document.getElementById('app'),
);
