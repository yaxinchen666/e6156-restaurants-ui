import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineUser } from 'react-icons/ai';
import Cookies from "universal-cookie"
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Navigation = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const getUserLink = () => {
    if (cookies.get("id") === null || cookies.get("id") === undefined) {
      navigate("/user/login");
    } else {
      navigate("/user/home");
    }
  }

  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand>COMS 6156</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="container-fluid">
            <Nav.Link href="/">All Restaurants</Nav.Link>
            <Nav.Item className="ms-auto">
              <Button variant="outline-secondary" onClick={getUserLink}> <AiOutlineUser /> </Button>
            </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation

