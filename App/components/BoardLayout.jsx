import React from 'react';
import styled from 'styled-components';
import { BoardField } from './StyledComponents';

const FieldsGrid = styled.div`
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display: flex;
    flex-wrap:wrap;
`;

export default () => {
  const fields = [];
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      fields.push(<BoardField key={`${i}${j}`} fieldColor={(i + j) % 2 === 0 ? 'white' : '#2d2d2d'} />);
    }
  }

  return (
    <FieldsGrid>
      {fields}
    </FieldsGrid>
  );
};
