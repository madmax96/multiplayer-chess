import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';


const Queen = ({
  icon, isWhite, onClick, board, position,
}) => {
  function QueenHandler() {
    // todo next
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
  board: PropTypes.arrayOf(PropTypes.string),

};
export default Queen;
