import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
// import MoveHistory from './MoveHistory';
import WS from '../utils/ws';
import BoardLayout from './BoardLayout';
import Board from './Board';
import GameInfo from './GameInfo';

const BoardWrapper = styled.div`
  height:600px;
  width:600px;
  position:relative;
`;
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: {
        '00': 'r',
        '01': 'n',
        '02': 'b',
        '03': 'q',
        '04': 'k',
        '05': 'b',
        '06': 'n',
        '07': 'r',
        '10': 'p',
        '11': 'p',
        '12': 'p',
        '13': 'p',
        '14': 'p',
        '15': 'p',
        '16': 'p',
        '17': 'p',
        '60': 'P',
        '61': 'P',
        '62': 'P',
        '63': 'P',
        '64': 'P',
        '65': 'P',
        '66': 'P',
        '67': 'P',
        '70': 'R',
        '71': 'N',
        '72': 'B',
        '73': 'Q',
        '74': 'K',
        '75': 'B',
        '76': 'N',
        '77': 'R',
      },
      selected: '',
      validMoves: {},
      onMove: props.isWhite,
      opponentTime: 900000,
      myTime: 900000,
    };
    this.highlight = this.highlight.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  handleMove({
    selected, validMoves, boardState, opponentTime, myTime,
  }) {
    this.setState((prevState) => {
      const newState = {
        selected,
        validMoves,
        boardState,
        onMove: !prevState.onMove,
      };
      if (opponentTime && myTime) {
        newState.opponentTime = opponentTime;
        newState.myTime = myTime;
      }
      return newState;
    });
  }

  highlight({ selected, validMoves }) {
    this.setState({ selected, validMoves });
  }

  render() {
    const {
      boardState, selected, validMoves, onMove, opponentTime, myTime,
    } = this.state;
    const {
      isWhite, socket, opponentName, myName,
    } = this.props;
    return (
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={8} className="h-100 d-flex justify-content-center align-items-center">
          <BoardWrapper>
            <BoardLayout />
            <Board
              isWhite={isWhite}
              socket={socket}
              boardState={boardState}
              selected={selected}
              validMoves={validMoves}
              onMove={onMove}
              highlight={this.highlight}
              handleMove={this.handleMove}
            />
          </BoardWrapper>
          <GameInfo
            myTime={myTime}
            opponentTime={opponentTime}
            opponentName={opponentName}
            myName={myName}
          />
        </Col>
      </Row>
    );
  }
}
Game.propTypes = {
  isWhite: PropTypes.bool,
  socket: PropTypes.instanceOf(WS),
  opponentName: PropTypes.string.isRequired,
  myName: PropTypes.string.isRequired,
};
export default Game;
