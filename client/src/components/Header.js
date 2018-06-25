import React from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { auth } = this.props.auth;

    const authLinks = (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Manage
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <a href="">New Poll</a>
          </DropdownItem>
          <DropdownItem>Your Polls</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <a href="/api/logout">Logout</a>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );

    const guestLinks = (
      <NavItem>
        <NavLink href="/">Login</NavLink>
      </NavItem>
    );

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Vote Now</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/all-polls">All Polls</NavLink>
              </NavItem>
              {auth ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Header);
