import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';


const Knight = ({
  icon, isWhite, onClick, board, position,
}) => {
  function KnightHandler() {
    // todo next
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
  board: PropTypes.arrayOf(PropTypes.string),

};
export default Knight;
