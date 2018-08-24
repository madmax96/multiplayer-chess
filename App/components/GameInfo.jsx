import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserInfoBox from './UserInfoBox';

const InfoContainer = styled.div`
    height:600px;
    background-color:rgba(0,0,0,.5);
    flex:1;
`;

const GameInfo = ({
  myTime, opponentTime, myName, opponentName,
}) => (
  <InfoContainer className="d-flex flex-column justify-content-between">
    <UserInfoBox name={opponentName} time={opponentTime} eatenFigures={[]} />
    <UserInfoBox name={myName} time={myTime} eatenFigures={[]} />
  </InfoContainer>
);

GameInfo.propTypes = {
  myTime: PropTypes.number.isRequired,
  opponentTime: PropTypes.number.isRequired,
  opponentName: PropTypes.string.isRequired,
  myName: PropTypes.string.isRequired,
};

export default GameInfo;
