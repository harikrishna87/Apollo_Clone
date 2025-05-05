"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = () => {
  const timesNewRomanStyle = {
    fontFamily: 'Times New Roman, serif'
  };

  const signupButtonStyle = {
    backgroundColor: '#f88c6b',
    borderColor: '#f88c6b',
    transition: 'all 0.3s ease',
    ...timesNewRomanStyle
  };

  return (
    <Navbar 
      bg="white" 
      expand="lg" 
      className="shadow-sm py-2" 
      style={timesNewRomanStyle}
      collapseOnSelect
    >
      <Container>
        <Link href="/" className="navbar-brand fw-bold fs-4" style={{
          color: "#ff8c00",
          fontFamily: 'Times New Roman, serif',
          fontSize: "20px"
        }}>
          Apollo
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mx-auto my-2 my-lg-0" style={{ fontSize: "18px" }}>
            <Link href="/doctors" className="nav-link text-dark px-3" style={timesNewRomanStyle}>
              Doctors
            </Link>
            <Link href="/pharmacy" className="nav-link text-dark px-3" style={timesNewRomanStyle}>
              Pharmacy
            </Link>
            <Link href="/lab-tests" className="nav-link text-dark px-3" style={timesNewRomanStyle}>
              Lab Tests
            </Link>
            <Link href="/health-records" className="nav-link text-dark px-3" style={timesNewRomanStyle}>
              Health Records
            </Link>
          </Nav>

          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 mt-3 mt-lg-0">
            <Button 
              variant="link" 
              className="text-dark text-decoration-none p-0 mb-2 mb-lg-0"
              style={{...timesNewRomanStyle, fontSize: "18px"}}
            >
              Login
            </Button>
            <Button 
              style={{
                fontSize: "18px", 
                backgroundColor: "#ff8c00", 
                border: "1px solid #ff8c00",
                fontFamily: 'Times New Roman, serif'
              }}
            >
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;