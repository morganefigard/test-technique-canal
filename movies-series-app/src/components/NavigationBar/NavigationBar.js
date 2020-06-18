import './NavigationBar.css';
import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

export default class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand tag={Link} to="/"><img className="logo" src={require('../../assets/page_logo.jpg')} /></NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/movies">Movies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/series">Series</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    )
  }
}
