import React from 'react';
import Figure from './Figure';


export default (props) => {
  function pawnHandler() {
    const [i, j] = props.position;
    const availablePositions = [
      `${i - 1}${j}`,
    ];
    if (i == 6) {
      availablePositions.push(`${i - 2}${j}`);
    }
    props.onClick(availablePositions, [i, j]);
  }

  return (

    <Figure rotate={props.rotate} icon={props.icon} onClick={pawnHandler} />

  );
};
