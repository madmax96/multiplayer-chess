import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    padding:15px;
    font-size:22px;
    font-weight:bold;
    color:#FFC635;
    display:flex;
    justify-content:space-evenly;

`;


export default ({ name, time, eatenFigures }) => (
  <Box>
    <p>
      {name}
    </p>
    <p>
      {time}
    </p>
  </Box>
);
