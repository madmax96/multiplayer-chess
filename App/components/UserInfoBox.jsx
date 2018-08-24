import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Box = styled.div`
    padding:15px;
    font-size:22px;
    font-weight:bold;
    color:#FFC635;
    display:flex;
    justify-content:space-evenly;

`;

class UserInfoBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverTime: props.time,
      time: props.time,
      isTimerActive: props.isTimerActive,
    };
    this.intervalId = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isTimerActive !== prevState.isTimerActive) {
      const newState = { isTimerActive: nextProps.isTimerActive };
      if (nextProps.time !== prevState.serverTime) {
        newState.time = nextProps.time;
        newState.serverTime = nextProps.time;
      }
      return newState;
    }
    return null;
  }

  render() {
    const { name } = this.props;
    const { time, isTimerActive } = this.state;
    if (isTimerActive && !this.intervalId) {
      this.intervalId = setInterval(() => {
        this.setState(prevState => ({ time: prevState.time - 1000 }));
      }, 1000);
    }
    if (!isTimerActive && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    const totalSeconds = time / 1000;
    const minutes = Math.trunc(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return (
      <Box>
        <p>
          {name}
        </p>
        <p>
          {minutes}
            :
          {seconds}
        </p>
      </Box>);
  }
}
UserInfoBox.propTypes = {
  time: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isTimerActive: PropTypes.bool.isRequired,
  eatenFigures: PropTypes.arrayOf(PropTypes.string),
};
export default UserInfoBox;
