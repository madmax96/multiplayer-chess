import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';

const Bishop = ({
  icon, isWhite, onClick, board, position,
}) => {
  function isOpponentFigure(figure) {
    return isWhite ? figure.toLowerCase() === figure : figure.toUpperCase() === figure;
  }
  function BishopHandler() {
    let [i, j] = position;
    i = +i;
    j = +j;

    const validMoves = {};
    let fLeft;
    let bLeft;
    let fRight;
    let bRight;
    fLeft = bLeft = fRight = bRight = true;
    let iteration = 1;
    while (fLeft || bLeft || fRight || bRight) {
      if (fLeft) {
        if (board[`${i + iteration}${j - iteration}`] || i + iteration > 7 || j - iteration < 0) {
          fLeft = false;
          if (board[`${i + iteration}${j - iteration}`]
            && isOpponentFigure(board[`${i + iteration}${j - iteration}`])) validMoves[`${i + iteration}${j - iteration}`] = true;
        } else {
          validMoves[`${i + iteration}${j - iteration}`] = true;
        }
      }

      if (fRight) {
        if (board[`${i + iteration}${j + iteration}`] || i + iteration > 7 || j + iteration > 7) {
          fRight = false;
          if (board[`${i + iteration}${j + iteration}`]
            && isOpponentFigure(board[`${i + iteration}${j + iteration}`])) validMoves[`${i + iteration}${j + iteration}`] = true;
        } else {
          validMoves[`${i + iteration}${j + iteration}`] = true;
        }
      }
      if (bRight) {
        if (board[`${i - iteration}${j + iteration}`] || i - iteration < 0 || j + iteration > 7) {
          bRight = false;
          if (board[`${i - iteration}${j + iteration}`]
            && isOpponentFigure(board[`${i - iteration}${j + iteration}`])) validMoves[`${i - iteration}${j + iteration}`] = true;
        } else {
          validMoves[`${i - iteration}${j + iteration}`] = true;
        }
      }
      if (bLeft) {
        if (board[`${i - iteration}${j - iteration}`] || i - iteration < 0 || j - iteration < 0) {
          bLeft = false;
          if (board[`${i - iteration}${j - iteration}`]
            && isOpponentFigure(board[`${i - iteration}${j - iteration}`])) validMoves[`${i - iteration}${j - iteration}`] = true;
        } else {
          validMoves[`${i - iteration}${j - iteration}`] = true;
        }
      }
      iteration++;
    }

    onClick({ validMoves, selected: position });
  }

  return (
    <Figure isWhite={isWhite} icon={icon} onClick={BishopHandler} />
  );
};

Bishop.propTypes = {
  icon: PropTypes.string,
  isWhite: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  board: PropTypes.objectOf(PropTypes.string),

};
export default Bishop;
