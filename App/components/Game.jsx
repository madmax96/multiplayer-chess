import React from 'react';
// import styled from 'styled-components';
import MoveHistory from './MoveHistory';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div>
        <MoveHistory />
        <Board />
      </div>
    );
  }
}

export default Game;
