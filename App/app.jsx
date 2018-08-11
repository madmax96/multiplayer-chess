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
    };
    this.connect = this.connect.bind(this);
  }

  connect(username) {
    this.ws = new WS('ws://localhost:3000');
    this.ws.connect(username).then(() => {
      this.setState({
        gameStarted: true,
      });
      this.ws.on('ws_close', () => {
        alert('closed');
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <FixedBackground />
        {this.state.gameStarted ? (
          <Game figure={1} />
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
