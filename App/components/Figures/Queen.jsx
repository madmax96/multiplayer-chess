import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';

const Queen = ({
  icon, isWhite, onClick, board, position,
}) => {
  function isOpponentFigure(figure) {
    return isWhite ? figure.toLowerCase() === figure : figure.toUpperCase() === figure;
  }
  function QueenHandler() {
    let [i, j] = position;
    i = +i;
    j = +j;

    const validMoves = {};
    let front;
    let back;
    let left;
    let right;
    let fLeft;
    let bLeft;
    let fRight;
    let bRight;
    front = left = back = right = fLeft = bLeft = fRight = bRight = true;
    let iteration = 1;
    while (fLeft || bLeft || fRight || bRight || front || back || left || right) {
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
      if (iteration == 15) {
        alert('loop');
        break;
      }
    }

    onClick({ validMoves, selected: position });
  }

  return (
    <Figure isWhite={isWhite} icon={icon} onClick={QueenHandler} />
  );
};

Queen.propTypes = {
  icon: PropTypes.string,
  isWhite: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  board: PropTypes.objectOf(PropTypes.string),

};
export default Queen;
