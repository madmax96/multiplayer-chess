import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';


const Pawn = (props) => {
  function pawnHandler() {
    const { board, position } = props;
    let [i, j] = position;
    i = +i;
    j = +j;
    const validMoves = {
      [`${props.rotate ? i + 1 : i - 1}${j}`]: true,
    };
    if ((i === 6 && !props.rotate) || (i === 1 && props.rotate)) {
      validMoves[`${props.rotate ? i + 2 : i - 2}${j}`] = true;
    }

    props.onClick(validMoves, props.position);
    board.forEach((field) => {
      const [figureType, fieldPosition] = field.split('@');
      if (fieldPosition === `${i - 1}${j - 1}` && figureType !== (props.rotate ? figureType.toLowerCase()
        : figureType.toUpperCase())) {
        validMoves[`${i - 1}${j - 1}`] = true;
      }
    });
  }

  return (

    <Figure rotate={props.rotate} icon={props.icon} onClick={pawnHandler} />

  );
};

Pawn.propTypes = {
  icon: PropTypes.string,
  rotate: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  board: PropTypes.arrayOf(PropTypes.string),

};
export default Pawn;
