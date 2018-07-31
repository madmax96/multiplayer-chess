import React from 'react';
import styled from 'styled-components';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`;
class Test extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    return (
      <div>
        <Button>
        Test
        </Button>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
          Dropdown test
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>
                Header
            </DropdownItem>
            <DropdownItem disabled>
                Action
            </DropdownItem>
            <DropdownItem>
                Another Action
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
                Another Action 2
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default Test;
