import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';


const Pawn = ({
  icon, isWhite, onClick, board, position,
}) => {
  function pawnHandler() {
    let [i, j] = position;
    i = +i;
    j = +j;
    const validMoves = {};
    if (isWhite) {
      if (!board[`${i - 1}${j}`]) {
        validMoves[`${i - 1}${j}`] = true;
        if (!board[`${i - 2}${j}`] && i === 6) {
          validMoves[`${i - 2}${j}`] = true;
        }
      }

      let possibleAttack = board[`${i - 1}${j - 1}`];
      if (possibleAttack && possibleAttack.toLowerCase() === possibleAttack) {
        validMoves[`${i - 1}${j - 1}`] = true;
      }
      possibleAttack = board[`${i - 1}${j + 1}`];
      if (possibleAttack && possibleAttack.toLowerCase() === possibleAttack) {
        validMoves[`${i - 1}${j + 1}`] = true;
      }
    } else {
      if (!board[`${i + 1}${j}`]) {
        validMoves[`${i + 1}${j}`] = true;
        if (!board[`${i + 2}${j}`] && i === 1) {
          validMoves[`${i + 2}${j}`] = true;
        }
      }

      let possibleAttack = board[`${i + 1}${j - 1}`];
      if (possibleAttack && possibleAttack.toUpperCase() === possibleAttack) {
        validMoves[`${i + 1}${j - 1}`] = true;
      }
      possibleAttack = board[`${i + 1}${j + 1}`];
      if (possibleAttack && possibleAttack.toUpperCase() === possibleAttack) {
        validMoves[`${i + 1}${j + 1}`] = true;
      }
    }
    onClick({ validMoves, selected: position });
  }
  return (
    <Figure isWhite={isWhite} icon={icon} onClick={pawnHandler} />
  );
};

Pawn.propTypes = {
  icon: PropTypes.string,
  isWhite: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  board: PropTypes.arrayOf(PropTypes.string),

};
export default Pawn;
