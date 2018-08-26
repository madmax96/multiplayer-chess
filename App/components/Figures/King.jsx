import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';

const King = ({
  icon, isWhite, onClick, board, position,
}) => {
  function isOpponentFigure(figure) {
    return isWhite ? figure.toLowerCase() === figure : figure.toUpperCase() === figure;
  }
  function KingHandler() {
    let [i, j] = position;
    i = +i;
    j = +j;

    const validMoves = {};
    const possibleMoves = [`${i + 1}${j}`, `${i - 1}${j}`, `${i}${j + 1}`, `${i}${j - 1}`,
      `${i + 1}${j + 1}`, `${i - 1}${j + 1}`, `${i - 1}${j - 1}`, `${i + 1}${j - 1}`];

    possibleMoves.forEach((move) => {
      if (board[move]) {
        if (isOpponentFigure(board[move])) validMoves[move] = true;
      } else {
        validMoves[move] = true;
      }
    });

    onClick({ validMoves, selected: position });
  }

  return (

    <Figure isWhite={isWhite} icon={icon} onClick={KingHandler} />

  );
};
King.propTypes = {
  icon: PropTypes.string,
  isWhite: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  board: PropTypes.objectOf(PropTypes.string),

};
export default King;
