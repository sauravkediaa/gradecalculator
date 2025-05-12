// src/pages/QuickCGPACalculator.js
import React, { useState, useEffect } from 'react';
import { computeQuickCGPA } from '../utils/gradeUtils';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';

export default function QuickCGPACalculator() {
    // form fields
    const [oldCgpa, setOldCgpa] = useState('');
    const [oldCredits, setOldCredits] = useState('');
    const [newCredits, setNewCredits] = useState('');
    const [newGpa, setNewGpa] = useState('');

    // manual vs live toggle
    const [manual, setManual] = useState(
        () => JSON.parse(localStorage.getItem('manualQuick')) || false
    );

    // result never null
    const [result, setResult] = useState({ newCgpa: null, totalCredits: null });

    // persist manual mode
    useEffect(() => {
        localStorage.setItem('manualQuick', JSON.stringify(manual));
    }, [manual]);

    // auto-calculate when inputs change (live mode)
    useEffect(() => {
        if (!manual) {
            handleCalculate();
        }
    }, [oldCgpa, oldCredits, newCredits, newGpa, manual]);

    const handleCalculate = () => {
        const res = computeQuickCGPA(oldCgpa, oldCredits, newCredits, newGpa);
        setResult(res);
    };

    const handleReset = () => {
        setOldCgpa('');
        setOldCredits('');
        setNewCredits('');
        setNewGpa('');
        setResult({ newCgpa: null, totalCredits: null });
    };

    return (
        <Container className="py-4">
            <h3 className="text-center mb-4">Quick CGPA Calculator</h3>

            {/* Manual / Live toggle */}
            <div className="text-center mb-3">
                <Form.Check
                    inline
                    type="switch"
                    id="manual-switch-quick"
                    label="Manual Update"
                    checked={manual}
                    onChange={() => setManual(m => !m)}
                />
            </div>

            {/* -- START: form without any Card -- */}
            <Form>
                {/* Row 1 */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="oldCgpa">
                            <Form.Label>Old CGPA</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="e.g. 8.50"
                                value={oldCgpa}
                                onChange={e => setOldCgpa(e.target.value)}
                                className="text-center"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="oldCredits">
                            <Form.Label>Total Credits Completed</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="e.g. 90"
                                value={oldCredits}
                                onChange={e => setOldCredits(e.target.value)}
                                className="text-center"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Row 2 */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="newCredits">
                            <Form.Label>Credits This Semester</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="e.g. 20"
                                value={newCredits}
                                onChange={e => setNewCredits(e.target.value)}
                                className="text-center"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="newGpa">
                            <Form.Label>Expected GPA</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="e.g. 9.00"
                                value={newGpa}
                                onChange={e => setNewGpa(e.target.value)}
                                className="text-center"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Buttons */}
                <Row className="justify-content-center mb-3">
                    {manual && (
                        <Col xs="auto">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Calculate new CGPA</Tooltip>}
                            >
                                <Button variant="primary" onClick={handleCalculate}>
                                    Calculate
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    )}
                    <Col xs="auto">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Reset all fields</Tooltip>}
                        >
                            <Button variant="warning" onClick={handleReset}>
                                Reset
                            </Button>
                        </OverlayTrigger>
                    </Col>
                </Row>
            </Form>
            {/* -- END: form -- */}

            {/* Result */}
            {result.newCgpa !== null && (
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <div
                            className="bg-secondary text-white text-center p-4 rounded mb-4"
                            style={{ fontSize: '1.6rem' }}
                        >
                            <strong>New CGPA:</strong> {result.newCgpa} &nbsp;<br></br> &nbsp; Credits:{' '}
                            {result.totalCredits}
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
}
