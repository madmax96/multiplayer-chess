import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import WS from '../utils/ws';
import BoardLayout from './BoardLayout';
import Board from './Board';
import GameInfo from './GameInfo';

const BoardWrapper = styled.div`
  height:600px;
  width:600px;
  position:relative;
`;
const WinnerMessage = styled.div`
  width:100%;
  height:100%;
  position:absolute;
  z-index:1000;
  background-color:rgba(0,0,0,.9);
  font-weight:bold;
  text-transform:uppercase;
  color:white;
  font-size:22px;
  display:flex;
  justify-content:center;
  align-items:center;
`;

class Game extends React.Component {
  constructor(props) {
    super(props);
    props.socket.on('timer', () => {
      this.setState(prevState => ({
        winner: !prevState.onMove,
      }));
    });
    props.socket.on('opponentGone', () => {
      this.setState({
        winner: true,
      });
    });

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
      myEatenFigures: [],
      opponentEatenFigures: [],
      selected: '',
      validMoves: {},
      onMove: props.isWhite,
      opponentTime: 900000,
      myTime: 900000,
      winner: null,
    };
    this.highlight = this.highlight.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  handleMove({
    selected, validMoves, boardState, opponentTime, myTime, eaten, myMove,
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
      if (eaten) {
        myMove ? newState.opponentEatenFigures = [...prevState.opponentEatenFigures, eaten]
          : newState.myEatenFigures = [...prevState.myEatenFigures, eaten];
      }
      return newState;
    });
  }

  highlight({ selected, validMoves }) {
    this.setState({ selected, validMoves });
  }

  render() {
    const {
      boardState, selected, validMoves, onMove, opponentTime,
      myTime, myEatenFigures, opponentEatenFigures, winner,
    } = this.state;
    const {
      isWhite, socket, opponentName, myName,
    } = this.props;
    let winnerMessage = null;
    if (winner !== null) {
      winnerMessage = winner === true ? (
        <WinnerMessage>
          Congratulations! You Won
        </WinnerMessage>
      )
        : (
          <WinnerMessage>
            Looser!!! You Lost
          </WinnerMessage>
        );
    }
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
            {winnerMessage}
          </BoardWrapper>
          { winner === null && (
          <GameInfo
            isWhite={isWhite}
            myTime={myTime}
            opponentTime={opponentTime}
            opponentName={opponentName}
            myName={myName}
            onMove={onMove}
            myEatenFigures={myEatenFigures}
            opponentEatenFigures={opponentEatenFigures}
          />
          ) }
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
