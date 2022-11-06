import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineUser } from 'react-icons/ai';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand>COMS 6156</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="container-fluid">
            <Nav.Link href="/">All Restaurants</Nav.Link>
            <Nav.Item className="ms-auto">
                <Nav.Link href="/user/home"><AiOutlineUser /></Nav.Link>
            </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation

