import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';


const Rook = ({
  icon, isWhite, onClick, board, position,
}) => {
  function RookHandler() {
    // todo next
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
  board: PropTypes.arrayOf(PropTypes.string),

};
export default Rook;
