import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import image from '../public/background.jpeg';
import WSocket from './utils/ws';


function connect() {
  const ws = new WSocket('ws://localhost:3000');
  ws.connect('user').then(() => {
    alert('connected');
    ws.on('ws_close', () => {
      console.log('closed');
    });
  }).catch((err) => {
    console.log(err);
  });
}
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
  &:after{
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    background-color:rgba(0,0,0,.75);
  }
`;

const StartForm = styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:30%;
  height:30vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

ReactDOM.render(
  (
    <div>
      <FixedBackground />
      <StartForm>
        <h4>
          Type your username and start playing now
        </h4>
        <input type="text" />
        <button type="button" onClick={connect}>
          Play
        </button>
      </StartForm>
    </div>
  ), document.getElementById('app'),
);
