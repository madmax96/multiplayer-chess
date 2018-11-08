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
    this.gameData = {};
    this.connect = this.connect.bind(this);
  }

  componentWillMount() {
    this.ws = new WS('ws://localhost:3000');
    this.ws.connect().then(() => {
      const gameData = localStorage.getItem('gameData');
      if (gameData) {
        this.gameData = JSON.parse(gameData);
        const { figure, roomId } = this.gameData;
        this.ws.emmit('reconnect', { roomId, figure });
      }

      this.ws.on('gameStart', (gameData) => {
        const onMove = gameData.figure == 1;
        if (onMove) {
          this.ws.emmit('ack', { timestamp: Date.now() });
        }
        this.gameData = { ...this.gameData, ...gameData, onMove };
        localStorage.setItem('gameData', JSON.stringify(this.gameData));
        this.setState({
          gameStarted: true,
        });
      });

      this.ws.on('reconnection', ({
        success, gameBoard, opponentRemainingTime, myRemainingTime, onMove,
      }) => {
        if (success) {
          const allFigures = ['r', 'b', 'n', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
            'R', 'B', 'N', 'Q', 'K', 'B', 'N', 'R', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'];

          const positions = Object.getOwnPropertyNames(gameBoard);

          positions.forEach((position) => {
            allFigures.splice(allFigures.indexOf(gameBoard[position]), 1);
          });


          const myEatenFigures = [];
          const opponentEatenFigures = [];
          allFigures.forEach((figure) => {
            if ((figure.toUpperCase() == figure && this.gameData.figure == 1)
            || (figure.toLowerCase() == figure && this.gameData.figure == 0)) {
              myEatenFigures.push(figure);
            } else {
              opponentEatenFigures.push(figure);
            }
          });
          this.gameData = {
            ...this.gameData,
            gameBoard,
            opponentRemainingTime,
            myRemainingTime,
            onMove,
            myEatenFigures,
            opponentEatenFigures,
          };
          this.setState({
            gameStarted: true,
          });
        } else {
          localStorage.setItem('gameData', '');
        }
      });
    }).catch(() => {
      alert('Connection to server failed. Please try again later!');
    });
  }

  connect(name) {
    this.gameData.myName = name;
    this.ws.emmit('start', { name });
  }

  render() {
    const { gameStarted } = this.state;
    const {
      figure, opponentName, myName, opponentRemainingTime,
      myRemainingTime, onMove, gameBoard, myEatenFigures, opponentEatenFigures,
    } = this.gameData;
    return (
      <FullHeight>
        <FixedBackground />
        {gameStarted ? (
          <Game
            isWhite={figure == 1}
            onMove={onMove}
            opponentName={opponentName}
            opponentRemainingTime={opponentRemainingTime}
            myRemainingTime={myRemainingTime}
            myName={myName}
            gameBoard={gameBoard}
            myEatenFigures={myEatenFigures}
            opponentEatenFigures={opponentEatenFigures}
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
