import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import loader from '../../public/loader.png';

const Centered = styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:30%;
  height:30vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

const Button = styled.button`
    font-size:20px;
    font-weight:bold;
    color:white;
    background-color:#28A745;
    border:none!important;
    border-radius:5px;
    padding:5px 25px;
    margin-top:30px;
    cursor:pointer;
`;

const UsernameInput = styled.input`
    background-color:transparent;
    border:none;
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
const ResponsiveIMG = styled.img`
    width:100%;
    height:auto;
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
      <div>
        {this.state.loading
          ? (
            <Centered>
              <h1>
                Waiting for opponent...
              </h1>
              <Rotate>
                <ResponsiveIMG src={loader} alt="loader" />
              </Rotate>
            </Centered>
          )
          : (
            <Centered>
              <UsernameInput
                valid={this.state.isValid}
                type="text"
                value={this.state.username}
                placeholder="Enter your username"
                onChange={this.handleUsernameInput}
              />
              <Button onClick={this.handleStartGame}>
                Start Game
              </Button>
            </Centered>
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
