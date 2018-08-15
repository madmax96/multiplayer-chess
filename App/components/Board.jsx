import React from 'react';
import PropTypes from 'prop-types';
import {
  Figure, Rook, King, Queen, Pawn, Knight, Bishop, Icons,
} from './Figures/Figures';

import { BoardField, BoardLayout, FiguresGrid } from './StyledComponents';

const HIGHILGHT_TYPES = {
  info: 'rgba(0, 123, 255,.5)',
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: [
        ['r-0', 'kn-0', 'b-0', 'q-0', 'k-0', 'b-0', 'kn-0', 'r-0'],
        ['p-0', 'p-0', 'p-0', 'p-0', 'p-0', 'p-0', 'p-0', 'p-0'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['p-1', 'p-1', 'p-1', 'p-1', 'p-1', 'p-1', 'p-1', 'p-1'],
        ['r-1', 'kn-1', 'b-1', 'q-1', 'k-1', 'b-1', 'kn-1', 'r-1'],
      ],
      highlight: {
        selected: '',
        available: [],
      },
    };
    this.highlightPosibleMoves = this.highlightPosibleMoves.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.figuresMap = {
      p: (i, j, rotate) => <Pawn icon={Icons[`p${props.figure}`]} rotate={rotate} onClick={this.highlightPosibleMoves} position={[i, j]} />,
      r: (i, j, rotate) => <Rook icon={Icons[`r${props.figure}`]} rotate={rotate} onClick={this.highlightPosibleMoves} position={[i, j]} />,
      k: (i, j, rotate) => <King icon={Icons[`k${props.figure}`]} rotate={rotate} onClick={this.highlightPosibleMoves} position={[i, j]} />,
      q: (i, j, rotate) => <Queen icon={Icons[`q${props.figure}`]} rotate={rotate} onClick={this.highlightPosibleMoves} position={[i, j]} />,
      kn: (i, j, rotate) => <Knight icon={Icons[`kn${props.figure}`]} rotate={rotate} onClick={this.highlightPosibleMoves} position={[i, j]} />,
      b: (i, j, rotate) => <Bishop icon={Icons[`b${props.figure}`]} rotate={rotate} onClick={this.highlightPosibleMoves} position={[i, j]} />,
    };
  }

  handleMove([k, l]) {
    let [i, j] = this.state.highlight.selected;
    i = +i;
    j = +j;
    this.setState((prevState) => {
      const newBoard = prevState.boardState.map(row => row.slice());
      newBoard[k][l] = newBoard[i][j];
      newBoard[i][j] = '';
      return {
        boardState: newBoard,
        highlight: { selected: '', available: [] },
      };
    });
  }

  highlightPosibleMoves(fieldsToTest, [i, j]) {
    this.setState(
      prevState => ({
        highlight: {
          ...prevState.highlight,
          selected: `${i}${j}`,
          available: fieldsToTest,
        },
      }),
    );
  }

  render() {
    const fields = [];
    this.state.boardState.forEach((row, i) => row.forEach((figure, j) => {
      const [figureType, figureColor] = figure.split('-');
      let fieldColor;
      if (this.state.highlight.selected === `${i}${j}`) {
        fieldColor = 'rgba(23, 162, 184,.85)';
      } else if (this.state.highlight.available.includes(`${i}${j}`)) {
        fieldColor = 'rgba(40, 167, 69,.65)';
      } else {
        fieldColor = 'transparent';
      }
      if (figureColor == this.props.figure) {
        // my figures
        fields.push((
          <BoardField fieldColor={fieldColor}>
            {this.figuresMap[figureType](i, j, this.props.figure == 0)}
          </BoardField>));
      } else {
        let moveHandler;
        if (this.state.highlight.available.includes(`${i}${j}`)) {
          moveHandler = () => this.handleMove([i, j]);
        }
        fields.push((
          <BoardField fieldColor={fieldColor}>
            <Figure rotate={this.props.figure == 0} icon={Icons[`${figureType}${figureColor}`]} onClick={moveHandler} />
          </BoardField>));
      }
    }));
    return (
      <BoardLayout>
        {this.state.boardState.map((row, i) => row.map((figure, j) => (
          <BoardField
            fieldColor={(i + j) % 2 === 0 ? 'white' : 'black'}
          />
        )))}
        <FiguresGrid rotate={this.props.figure == 0}>
          {fields}
        </FiguresGrid>
      </BoardLayout>
    );
  }
}

Board.propTypes = {
  figure: PropTypes.number,
};
export default Board;
