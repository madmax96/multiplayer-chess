import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Icons } from './Figures/Figures';

const Box = styled.div`
    padding:15px;
    font-size:22px;
    font-weight:bold;
    color:${props => (props.white ? '#FFC635' : 'black')};
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

  componentWillUnmount() {
    this.intervalId && clearInterval(this.intervalId);
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
    const {
      name, eatenFigures, isWhite, top, opponentGone,
    } = this.props;
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

    const eatenFiguresRow = eatenFigures.map((figure, i) => (
      <Col xs={2} key={figure + i}>
        <img className="img-fluid" src={Icons[figure]} alt="figure" />
      </Col>
    ));
    const infoRow = (
      <Col xs={12} key="infoRow">
        <Box white={isWhite}>
          <p>
            {name}
          </p>
          <p>
            {minutes}
              :
            {seconds}
          </p>
        </Box>

      </Col>
    );
    const opponentGoneMessage = opponentGone ? (
      <div key="opponentGoneMessage" className="d-flex w-100 justify-content-center p-2 text-info font-weight-bold">
        Opponent  lost connection. Waiting for 1 minute!
      </div>
    ) : null;
    return (
      <Row className="align-items-center pl-3">
        {top ? [infoRow, ...eatenFiguresRow, opponentGoneMessage]
          : [...eatenFiguresRow, infoRow, opponentGoneMessage] }
      </Row>
    );
  }
}
UserInfoBox.propTypes = {
  time: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isTimerActive: PropTypes.bool.isRequired,
  eatenFigures: PropTypes.arrayOf(PropTypes.string).isRequired,
  isWhite: PropTypes.bool.isRequired,
  top: PropTypes.bool,
  opponentGone: PropTypes.bool,
};
export default UserInfoBox;
