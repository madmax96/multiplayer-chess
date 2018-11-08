import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Row, Button,
} from 'reactstrap';
import loader from '../../public/loader.png';


const UsernameInput = styled.input`
    background-color:transparent;
    border:none;
    outline:none;
    border-bottom:3px solid;
    border-bottom-color: ${props => (props.valid ? '#28A745' : '#DC3545')};
    color:white;
    font-weight:bold;
    font-size:22px;
    text-align:center;
    transition:all .3s;
`;

const rotate = keyframes`
    0% {
        transform:rotate(0);
    }
    5% {
        transform:rotate(-5deg);
    }
    100% {
        transform:rotate(360deg);
    }
`;

const Rotate = styled.div`
     animation: ${rotate} 1s ease-in-out infinite;
`;

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loading: false,
      isValid: false,
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
  }

  handleUsernameInput(e) {
    const username = e.target.value;

    this.setState({
      username,
      isValid: username.length > 2,
    });
  }

  handleStartGame() {
    if (this.state.isValid) {
      this.setState({
        loading: true,
      });
      this.props.connect(this.state.username);
    }
  }

  render() {
    return (
      <div className="h-100 align-items-center justify-content-center d-flex">
        {this.state.loading
          ? (
            <Rotate>
              <img src={loader} alt="loader" className="img-fluid" />
            </Rotate>
          )
          : (
            <Row className="flex-column">
              <UsernameInput
                valid={this.state.isValid}
                type="text"
                value={this.state.username}
                placeholder="Enter your username"
                onChange={this.handleUsernameInput}
              />
              <Button onClick={this.handleStartGame} color="primary" className="mt-4">
                Start Game
              </Button>
            </Row>
          )
            }
      </div>
    );
  }
}
StartGame.propTypes = {
  connect: PropTypes.func,
};
export default StartGame;
