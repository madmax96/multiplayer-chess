import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';

const Knight = ({
  icon, isWhite, onClick, board, position,
}) => {
  function isOpponentFigure(figure) {
    return isWhite ? figure.toLowerCase() === figure : figure.toUpperCase() === figure;
  }
  function KnightHandler() {
    let [i, j] = position;
    i = +i;
    j = +j;

    const validMoves = {};
    const possibleMoves = [`${i + 2}${j - 1}`, `${i + 2}${j + 1}`, `${i - 2}${j + 1}`, `${i - 2}${j - 1}`,
      `${i + 1}${j - 2}`, `${i + 1}${j + 2}`, `${i - 1}${j + 2}`, `${i - 1}${j - 2}`];

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

    <Figure isWhite={isWhite} icon={icon} onClick={KnightHandler} />

  );
};
Knight.propTypes = {
  icon: PropTypes.string,
  isWhite: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  board: PropTypes.objectOf(PropTypes.string),

};
export default Knight;
