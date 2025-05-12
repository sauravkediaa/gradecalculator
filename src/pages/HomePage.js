import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <Container className="text-center py-5">
            <h1 className="mb-4">Welcome to VIT Grade Calculator</h1>
            <p className="lead mb-5">
                Quickly compute your CGPA, GPA, or convert grading scales.
            </p>
            <div className="d-grid gap-3 col-6 mx-auto">
                <Button as={Link} to="/cgpa" variant="outline-primary" size="lg">
                    CGPA Calculator
                </Button>
                <Button as={Link} to="/gpa" variant="outline-primary" size="lg">
                    GPA Calculator
                </Button>
                <Button as={Link} to="/converter" variant="outline-primary" size="lg">
                    Scale Converter
                </Button>
            </div>
        </Container>
    );
}
