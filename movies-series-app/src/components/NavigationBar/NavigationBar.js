import './NavigationBar.css';
import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

export default class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">VideoFutur</NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/movies">Movies</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    )
  }
}
