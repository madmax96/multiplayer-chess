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
class Figure extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <FigureWrap onClick={this.props.onClick} rotate={this.props.rotate}>
        <FigureIMG src={this.props.icon} alt="" />
      </FigureWrap>
    );
  }
}
Figure.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  rotate: PropTypes.bool,
};
export default Figure;
