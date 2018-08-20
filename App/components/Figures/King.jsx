import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';


const King = ({
  icon, isWhite, onClick, board, position,
}) => {
  function KingHandler() {
    let [i, j] = position;
    i = +i;
    j = +j;
    const validMoves = {};
  }
  // test again motherfuckers

  return (

    <Figure isWhite={isWhite} icon={icon} onClick={KingHandler} />

  );
};

King.propTypes = {
  icon: PropTypes.string,
  isWhite: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  board: PropTypes.arrayOf(PropTypes.string),

};
export default King;
