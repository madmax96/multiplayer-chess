import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';

const Rook = ({
  icon, isWhite, onClick, board, position,
}) => {
  function isOpponentFigure(figure) {
    return isWhite ? figure.toLowerCase() === figure : figure.toUpperCase() === figure;
  }
  function RookHandler() {
    let [i, j] = position;
    i = +i;
    j = +j;

    const validMoves = {};
    let front;
    let back;
    let left;
    let right;
    front = back = left = right = true;
    let iteration = 1;
    while (front || back || left || right) {
      if (front) {
        if (board[`${i + iteration}${j}`] || i + iteration > 7) {
          front = false;
          if (board[`${i + iteration}${j}`] && isOpponentFigure(board[`${i + iteration}${j}`])) validMoves[`${i + iteration}${j}`] = true;
        } else {
          validMoves[`${i + iteration}${j}`] = true;
        }
      }

      if (back) {
        if (board[`${i - iteration}${j}`] || i - iteration < 0) {
          back = false;
          if (board[`${i - iteration}${j}`] && isOpponentFigure(board[`${i - iteration}${j}`])) validMoves[`${i - iteration}${j}`] = true;
        } else {
          validMoves[`${i - iteration}${j}`] = true;
        }
      }
      if (left) {
        if (board[`${i}${j - iteration}`] || j - iteration < 0) {
          left = false;
          if (board[`${i}${j - iteration}`] && isOpponentFigure(board[`${i}${j - iteration}`])) validMoves[`${i}${j - iteration}`] = true;
        } else {
          validMoves[`${i}${j - iteration}`] = true;
        }
      }
      if (right) {
        if (board[`${i}${j + iteration}`] || j + iteration > 7) {
          right = false;
          if (board[`${i}${j + iteration}`] && isOpponentFigure(board[`${i}${j + iteration}`])) validMoves[`${i}${j + iteration}`] = true;
        } else {
          validMoves[`${i}${j + iteration}`] = true;
        }
      }
      iteration++;
    }

    onClick({ validMoves, selected: position });
  }

  return (

    <Figure isWhite={isWhite} icon={icon} onClick={RookHandler} />

  );
};

Rook.propTypes = {
  icon: PropTypes.string,
  isWhite: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  board: PropTypes.objectOf(PropTypes.string),

};
export default Rook;
