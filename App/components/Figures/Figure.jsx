import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FigureIMG } from '../StyledComponents';

const FigureWrap = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  transform:${props => (props.rotate ? 'rotate(180deg)' : '')};
`;
const Figure = ({ icon, onClick, isWhite }) => (
  <FigureWrap onClick={onClick} rotate={!isWhite}>
    <FigureIMG src={icon} alt="" />
  </FigureWrap>
);

Figure.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  isWhite: PropTypes.bool,
};
export default Figure;
