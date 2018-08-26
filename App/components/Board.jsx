import React from 'react';
import PropTypes from 'prop-types';
import WS from '../utils/ws';
import {
  Figure, Rook, King, Queen, Pawn, Knight, Bishop, Icons,
} from './Figures/Figures';

import { BoardField, FiguresGrid } from './StyledComponents';


const Board = (props) => {
  function handleOponentMove({ from, to }, opponentTime, myTime) {
    props.socket.emmit('ack', { timestamp: Date.now() });
    const { boardState } = props;
    const eaten = boardState[to];
    const newBoardState = { ...boardState };
    newBoardState[to] = newBoardState[from];
    delete newBoardState[from];

    props.handleMove({
      selected: '',
      validMoves: {},
      boardState: newBoardState,
      opponentTime,
      myTime,
      eaten,
      myMove: false,
    });
  }

  function handleMyMove(newPosition) {
    const { selected, boardState } = props;
    const eaten = boardState[newPosition];
    const newBoardState = { ...boardState };
    newBoardState[newPosition] = newBoardState[selected];
    delete newBoardState[selected];
    props.socket.emmit('move',
      {
        gameBoard: newBoardState,
        timestamp: Date.now(),
        move: {
          from: selected,
          to: newPosition,
        },
      });
    props.handleMove({
      selected: '',
      validMoves: {},
      boardState: newBoardState,
      eaten,
      myMove: true,
    });
  }
  function highlight({ validMoves, selected }) {
    let newState = {
      validMoves,
      selected,
    };
    if (selected === props.selected) {
      newState = {
        selected: '',
        validMoves: {},

      };
    }
    props.highlight(newState);
  }

  props.socket.on('move',
    ({ move, opponentRemainingTime, myRemainingTime }) => handleOponentMove(move,
      opponentRemainingTime, myRemainingTime));

  const figuresMap = {
    p: position => (
      <Pawn
        board={props.boardState}
        icon={Icons[props.isWhite ? 'P' : 'p']}
        isWhite={props.isWhite}
        onClick={props.onMove ? highlight : () => {}}
        position={position}
      />
    ),
    r: position => (
      <Rook
        board={props.boardState}
        icon={Icons[props.isWhite ? 'R' : 'r']}
        isWhite={props.isWhite}
        onClick={props.onMove ? highlight : () => {}}
        position={position}
      />
    ),
    k: position => (
      <King
        board={props.boardState}
        icon={Icons[props.isWhite ? 'K' : 'k']}
        isWhite={props.isWhite}
        onClick={props.onMove ? highlight : () => {}}
        position={position}
      />
    ),
    q: position => (
      <Queen
        board={props.boardState}
        icon={Icons[props.isWhite ? 'Q' : 'q']}
        isWhite={props.isWhite}
        onClick={props.onMove ? highlight : () => {}}
        position={position}
      />
    ),
    n: position => (
      <Knight
        board={props.boardState}
        icon={Icons[props.isWhite ? 'N' : 'n']}
        isWhite={props.isWhite}
        onClick={props.onMove ? highlight : () => {}}
        position={position}
      />
    ),
    b: position => (
      <Bishop
        board={props.boardState}
        icon={Icons[props.isWhite ? 'B' : 'b']}
        isWhite={props.isWhite}
        onClick={props.onMove ? highlight : () => {}}
        position={position}
      />
    ),
  };


  const fields = [];
  const { isWhite, boardState } = props;
  const positions = Object.keys(boardState);
  positions.forEach((fieldPosition) => {
    const figureType = boardState[fieldPosition];
    let fieldColor;
    if (props.selected === fieldPosition) {
      fieldColor = 'rgba(23, 162, 184,.85)';
    } else if (props.validMoves[fieldPosition]) {
      fieldColor = 'rgba(40, 167, 69,.65)';
    } else {
      fieldColor = 'transparent';
    }
    let [i, j] = fieldPosition;
    i = +i;
    j = +j;
    const index = i * 8 + j;

    if ((isWhite && figureType.toUpperCase() === figureType)
       || ((!isWhite && figureType.toLowerCase() === figureType))) {
      // my figures
      fields[index] = (
        <BoardField fieldColor={fieldColor} key={`${i}${j}`}>
          {figuresMap[figureType.toLowerCase()](fieldPosition)}
        </BoardField>);
    } else {
      let eatFigureHandler;
      if (props.validMoves[fieldPosition]) {
        fieldColor = 'red';
        eatFigureHandler = () => handleMyMove(fieldPosition);
      }
      fields[index] = (
        <BoardField fieldColor={fieldColor} key={`${i}${j}`}>
          <Figure isWhite={isWhite} icon={Icons[figureType]} onClick={eatFigureHandler} />
        </BoardField>);
    }
  });

  for (let i = 0; i < 64; i++) {
    if (fields[i] == null) {
      // empty fields
      const position = `${Math.trunc(i / 8)}${i % 8}`;
      let field = <BoardField key={position} />;
      if (props.validMoves[position]) {
        field = (
          <BoardField fieldColor="rgba(40, 167, 69,.65)" key={position}>
            <Figure onClick={() => handleMyMove(position)} />
          </BoardField>
        );
      }
      fields[i] = field;
    }
  }
  return (
    <FiguresGrid rotate={!isWhite}>
      { fields }
    </FiguresGrid>
  );
};

Board.propTypes = {
  isWhite: PropTypes.bool.isRequired,
  onMove: PropTypes.bool.isRequired,
  validMoves: PropTypes.objectOf(PropTypes.bool),
  highlight: PropTypes.func.isRequired,
  selected: PropTypes.string,
  handleMove: PropTypes.func.isRequired,
  boardState: PropTypes.objectOf(PropTypes.string).isRequired,
  socket: PropTypes.instanceOf(WS),

};
export default Board;
