import React from 'react';
import PropTypes from 'prop-types';
import {
  Figure, Rook, King, Queen, Pawn, Knight, Bishop, Icons,
} from './Figures/Figures';

import { BoardField, FiguresGrid } from './StyledComponents';

class Board extends React.Component {
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

    };
    this.highlightPosibleMoves = this.highlightPosibleMoves.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.figuresMap = {
      p: position => (
        <Pawn
          board={this.state.boardState}
          icon={Icons[props.isWhite ? 'P' : 'p']}
          isWhite={props.isWhite}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      r: position => (
        <Rook
          board={this.state.boardState}
          icon={Icons[props.isWhite ? 'R' : 'r']}
          isWhite={props.isWhite}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      k: position => (
        <King
          board={this.state.boardState}
          icon={Icons[props.isWhite ? 'K' : 'k']}
          isWhite={props.isWhite}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      q: position => (
        <Queen
          board={this.state.boardState}
          icon={Icons[props.isWhite ? 'Q' : 'q']}
          isWhite={props.isWhite}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      n: position => (
        <Knight
          board={this.state.boardState}
          icon={Icons[props.isWhite ? 'N' : 'n']}
          isWhite={props.isWhite}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      b: position => (
        <Bishop
          board={this.state.boardState}
          icon={Icons[props.isWhite ? 'B' : 'b']}
          isWhite={props.isWhite}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
    };
  }

  onFigureEat(newPositon) {
    // do logic for eating
    this.handleMove(newPositon);
  }

  handleMove(newPosition) {
    this.setState((prevState) => {
      const { selected, boardState } = prevState;
      const newBoardState = { ...boardState };
      newBoardState[newPosition] = newBoardState[selected];
      delete newBoardState[selected];

      return {
        selected: '',
        validMoves: {},
        boardState: newBoardState,
      };
    });
  }


  highlightPosibleMoves(validMoves, selected) {
    let newState = {
      validMoves,
      selected,
    };
    if (selected === this.state.selected) {
      newState = {
        selected: '',
        validMoves: {},

      };
    }
    this.setState(
      newState,
    );
  }

  render() {
    const fields = [];
    const { isWhite } = this.props;
    const { boardState } = this.state;
    const positions = Object.keys(boardState);
    positions.forEach((fieldPosition) => {
      const figureType = boardState[fieldPosition];
      let fieldColor;
      if (this.state.selected === fieldPosition) {
        fieldColor = 'rgba(23, 162, 184,.85)';
      } else if (this.state.validMoves[fieldPosition]) {
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
            {this.figuresMap[figureType.toLowerCase()](fieldPosition)}
          </BoardField>);
      } else {
        let eatFigureHandler;
        if (this.state.validMoves[fieldPosition]) {
          fieldColor = 'red';
          eatFigureHandler = () => this.onFigureEat(fieldPosition);
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
        if (this.state.validMoves[position]) {
          field = (
            <BoardField fieldColor="rgba(40, 167, 69,.65)" key={position}>
              <Figure onClick={() => this.handleMove(position)} />
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
  }
}

Board.propTypes = {
  isWhite: PropTypes.bool,
};
export default Board;
