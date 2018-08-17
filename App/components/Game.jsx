import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import MoveHistory from './MoveHistory';
import { BoardWrapper } from './StyledComponents';

import BoardLayout from './BoardLayout';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // onMove: true,
    };
  }

  render() {
    return (
      <div>
        <MoveHistory />
        <BoardWrapper>
          <BoardLayout />
          <Board figure={this.props.figure} />
        </BoardWrapper>
      </div>
    );
  }
}
Game.propTypes = {
  figure: PropTypes.number,
};
export default Game;
