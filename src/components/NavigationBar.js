// src/components/NavigationBar.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationBar({ darkMode, toggleDarkMode }) {
    return (
        <Navbar
            bg={darkMode ? 'dark' : 'light'}
            variant={darkMode ? 'dark' : 'light'}
            expand="lg"
            sticky="top"
            className="w-100 px-4"
        >
            <Container fluid>
                <Navbar.Brand as={Link} to="/">GradeCalc</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/cgpa" className="px-3">CGPA</Nav.Link>
                        <Nav.Link as={Link} to="/gpa" className="px-3">GPA</Nav.Link>
                        <Nav.Link as={Link} to="/converter" className="px-3">Converter</Nav.Link>
                        <Nav.Link as={Link} to="/quick" className="px-3">Quick CGPA</Nav.Link>
                    </Nav>
                    <Button variant="outline-secondary" onClick={toggleDarkMode}>
                        {darkMode ? '☀️ Light' : '🌙 Dark'}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
