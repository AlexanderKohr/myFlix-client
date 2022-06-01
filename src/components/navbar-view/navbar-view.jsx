import React from "react";
import { Link } from "react-router-dom"
import './navbar-view.scss';

import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';


export function NavbarView({user}) {

    return (
      <Container id="navbar-container">
        <Navbar id="navbar" fixed="top">
          
          <Navbar.Brand id="navbar-brand" href="/">myFlix</Navbar.Brand>
          <Nav id="nav" className="me-auto">
          <Nav.Link id="nav-link" className="nav-item" as={Link} to={`/users/${user}`} >
                         {user}
                        </Nav.Link>
          </Nav>
        </Navbar>
      </Container>
        
        
    )
}