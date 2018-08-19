import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure';


const Bishop = ({
  icon, isWhite, onClick, board, position,
}) => {
  function BishopHandler() {
    // todo next
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
  board: PropTypes.arrayOf(PropTypes.string),

};
export default Bishop;
