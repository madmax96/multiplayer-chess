import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  Figure, Rook, King, Queen, Pawn, Knight, Bishop, Icons,
} from './Figures/Figures';

const HIGHILGHT_TYPES = {
  info: 'rgba(0, 123, 255,.5)',
};
const BoardLayout = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:600px;
    height:600px;
    display: flex;
    flex-wrap:wrap;
    border:8px solid black;
`;
const FiguresGrid = styled.div`
    position: absolute;
    top:0;
    left:0;
    transform:${props => (props.rotate ? 'rotate(180deg)' : '')};
    width:100%;
    height:100%;
    display: flex;
    flex-wrap:wrap;
`;
const BoardField = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  background-color: ${props => (props.fieldColor)};
  flex:0 0 12.5%;
  height:12.5%;
  cursor: ${props => (props.cursor)};
`;
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: [
        ['r0', 'kn0', 'b0', 'q0', 'k0', 'b0', 'kn0', 'r0'],
        ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['p1', 'p1', 'p1', 'p1', 'p1', 'p1', 'p1', 'p1'],
        ['r1', 'kn1', 'b1', 'q1', 'k1', 'b1', 'kn1', 'r1'],
      ],
      highlight: {
        selected: '00',
        available: ['11'],

      },
    };
  }

  render() {
    const fields = [];
    this.state.boardState.forEach((row, i) => row.forEach((figure, j) => {
      if (figure.includes(this.props.figure)) {
        // my figures
        fields.push((
          <BoardField>
            <Figure icon={Icons.queenW} onclick={() => window.alert('kurcina')} />
          </BoardField>));
      } else {
        fields.push((
          <BoardField>
            <Figure icon={Icons.queenB} />
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
        <FiguresGrid>
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
