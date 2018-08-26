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
  myTime, opponentTime, myName, opponentName, onMove, myEatenFigures, opponentEatenFigures, isWhite,
}) => (
  <InfoContainer className="d-flex flex-column justify-content-between">
    <UserInfoBox
      name={opponentName}
      time={opponentTime}
      eatenFigures={opponentEatenFigures}
      isTimerActive={!onMove}
      top
      isWhite={!isWhite}
    />
    <UserInfoBox
      name={myName}
      time={myTime}
      eatenFigures={myEatenFigures}
      isTimerActive={onMove}
      top={false}
      isWhite={isWhite}
    />
  </InfoContainer>
);

GameInfo.propTypes = {
  myTime: PropTypes.number.isRequired,
  opponentTime: PropTypes.number.isRequired,
  opponentName: PropTypes.string.isRequired,
  myName: PropTypes.string.isRequired,
  onMove: PropTypes.bool.isRequired,
  myEatenFigures: PropTypes.arrayOf(PropTypes.string).isRequired,
  opponentEatenFigures: PropTypes.arrayOf(PropTypes.string).isRequired,
  isWhite: PropTypes.bool.isRequired,
};

export default GameInfo;
