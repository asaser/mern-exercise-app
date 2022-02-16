import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Container} from 'react-bootstrap';


export default class NavbarMenu extends Component {

  render() {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#exerciseTracker">
          <Link to="/" className="navbar-brand">Excercise Tracker</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#exercise">
              <Link to="/" className="nav-link">Exercises</Link>
            </Nav.Link>
            <Nav.Link href="#createExercise">
              <Link to="/create" className="nav-link">Create Exercise</Link>
            </Nav.Link>
            <Nav.Link href="#creatUser">
              <Link to="/user" className="nav-link">Create User</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    );
  }
}