import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FigureIMG = styled.img`
    width:auto;
    height:90%;
    transition:'transform' .2s;
    &:hover{
      transform:scale(1.15);
    }
`;

class Figure extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <FigureIMG src={this.props.icon} alt="" onClick={this.props.onclick} />
    );
  }
}
Figure.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default Figure;
