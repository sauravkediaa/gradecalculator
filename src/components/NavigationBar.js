import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationBar({ darkMode, toggleDarkMode }) {
    return (
        <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">GradeCalc</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/cgpa">CGPA</Nav.Link>
                        <Nav.Link as={Link} to="/gpa">GPA</Nav.Link>
                        <Nav.Link as={Link} to="/converter">Converter</Nav.Link>
                    </Nav>
                    <Button variant="outline-secondary" onClick={toggleDarkMode}>
                        {darkMode ? 'Light' : 'Dark'}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
