import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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
            <Link to="/new-poll">New Poll</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/dashboard">Your Polls</Link>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <a href="/api/logout">Logout</a>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );

    const guestLinks = (
      <NavItem>
        <NavLink href="/login">Login</NavLink>
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
                <Link to="/all-polls" className="nav-link">
                  All Polls
                </Link>
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

export default connect(mapStateToProps)(withRouter(Header));
