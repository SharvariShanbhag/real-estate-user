// src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct import path

const Header = () => {
  const { isAuthenticated, user, logout, authLoading } = useAuth(); // Destructure authLoading
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home after logout
    // Optionally, you might want to show a success message here (e.g., a toast notification)
    // alert('You have been logged out.'); // Avoid alert, use a better notification system
  };

  return (
    <Navbar expand="lg" className="bg-light shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          <img
            src="/path/to/your/logo.png" // IMPORTANT: Replace with your actual logo path (e.g., /logo.png if in public folder)
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="EstateFlow Logo"
          />
          EstateFlow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/properties">Properties</Nav.Link> {/* Assuming you have a /properties page */}
            {/* Add other navigation links here */}

            {/* Conditional Login/Logout Buttons based on auth state */}
            {authLoading ? (
              // Show a spinner or nothing while authentication status is being determined
              <Spinner animation="border" size="sm" className="ms-3" />
            ) : !isAuthenticated ? (
              <Button as={Link} to="/login" variant="primary" className="ms-2">
                Login
              </Button>
            ) : (
              <>
                <Nav.Link className="me-2" style={{pointerEvents: 'none', cursor: 'default'}}>
                  Welcome, {user?.name || user?.email || 'User'}! {/* Display name or email */}
                </Nav.Link>
                {/* You can add a link to a user dashboard/profile here */}
                {/* <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link> */}
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;