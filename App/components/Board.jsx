import React from 'react';
import PropTypes from 'prop-types';
import {
  Figure, Rook, King, Queen, Pawn, Knight, Bishop, Icons,
} from './Figures/Figures';

import { BoardField, FiguresGrid } from './StyledComponents';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.isWhite = props.figure === 1;
    this.state = {
      boardState: [
        'r@00', 'n@01', 'b@02', 'q@03', 'k@04', 'b@05', 'n@06', 'r@07',
        'p@10', 'p@11', 'p@12', 'p@13', 'p@14', 'p@15', 'p@16', 'p@17',
        'P@60', 'P@61', 'P@62', 'P@63', 'P@64', 'P@65', 'P@66', 'P@67',
        'R@70', 'N@71', 'B@72', 'Q@73', 'K@74', 'B@75', 'N@76', 'R@77',
      ],
      selected: '',
      validMoves: {},

    };
    this.highlightPosibleMoves = this.highlightPosibleMoves.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.figuresMap = {
      p: (position, rotate, icon, board) => (
        <Pawn
          board={board}
          icon={icon}
          rotate={rotate}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      r: (position, rotate, icon, board) => (
        <Rook
          board={board}
          icon={icon}
          rotate={rotate}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      k: (position, rotate, icon, board) => (
        <King
          board={board}
          icon={icon}
          rotate={rotate}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      q: (position, rotate, icon, board) => (
        <Queen
          board={board}
          icon={icon}
          rotate={rotate}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      n: (position, rotate, icon, board) => (
        <Knight
          board={board}
          icon={icon}
          rotate={rotate}
          onClick={this.highlightPosibleMoves}
          position={position}
        />
      ),
      b: (position, rotate, icon, board) => (
        <Bishop
          board={board}
          icon={icon}
          rotate={rotate}
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
    let selectedFigure;

    this.setState((prevState) => {
      const { selected } = prevState;
      const newBoard = prevState.boardState.filter((field) => {
        const [figureType, fieldPosition] = field.split('@');
        if (selected === fieldPosition) {
          selectedFigure = figureType;
          return false;
        }
        return fieldPosition !== newPosition;
      });

      newBoard.push(`${selectedFigure}@${newPosition}`);
      return {
        selected: '',
        validMoves: {},
        boardState: newBoard,
      };
    });
  }


  highlightPosibleMoves(validMoves, selected) {
    this.setState(
      {
        validMoves,
        selected,
      },
    );
  }

  render() {
    const fields = [];
    this.state.boardState.forEach((field) => {
      const [figureType, fieldPosition] = field.split('@');
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

      if ((this.isWhite && figureType.toUpperCase() === figureType)
       || ((!this.isWhite && figureType.toLowerCase() === figureType))) {
        // my figures
        fields[index] = (
          <BoardField fieldColor={fieldColor} key={`${i}${j}`}>
            {this.figuresMap[figureType.toLowerCase()](fieldPosition,
              !this.isWhite, Icons[figureType], this.state.boardState)}
          </BoardField>);
      } else {
        let eatFigureHandler;
        if (this.state.validMoves[fieldPosition]) {
          fieldColor = 'red';
          eatFigureHandler = () => this.onFigureEat(fieldPosition);
        }
        fields[index] = (
          <BoardField fieldColor={fieldColor} key={`${i}${j}`}>
            <Figure rotate={!this.isWhite} icon={Icons[figureType]} onClick={eatFigureHandler} />
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
      <FiguresGrid rotate={!this.isWhite}>
        { fields }
      </FiguresGrid>
    );
  }
}

Board.propTypes = {
  figure: PropTypes.number,
};
export default Board;
