// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="footer py-3">
            <Container>
                <Row>
                    <Col
                        md={6}
                        className="text-center text-md-start mb-2 mb-md-0"
                    >
                        © {new Date().getFullYear()} VIT Grade Calculator by <a href="https://technie.in" className="text-decoration-none">Technie</a>. All rights reserved.
                    </Col>
                    <Col
                        md={6}
                        className="text-center text-md-end"
                    >
                        <a href="/privacy" className="me-3">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="me-3">
                            Terms of Service
                        </a>
                        <a href="/contact">
                            Contact Us
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
