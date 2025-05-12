import React, { useState } from 'react';
import { Offcanvas, Accordion } from 'react-bootstrap';

export default function HelpPanel() {
    const [show, setShow] = useState(false);
    return (
        <>
            <button
                className="btn btn-info"
                title="Need help?"
                style={{ position: 'fixed', bottom: 20, left: 20 }}
                onClick={() => setShow(true)}
            >?</button>


            <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                <Offcanvas.Header closeButton><Offcanvas.Title>Help & FAQs</Offcanvas.Title></Offcanvas.Header>
                <Offcanvas.Body>
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>How is CGPA computed?</Accordion.Header>
                            <Accordion.Body>
                                CGPA = (∑(credits×GPA)) / ∑credits. Enter semester‐wise credits and GPA.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Relative vs Absolute grading</Accordion.Header>
                            <Accordion.Body>…your blog content…</Accordion.Body>
                        </Accordion.Item>
                        {/* more items */}
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
// This code defines a HelpPanel component that provides a help and FAQ section in an offcanvas sidebar.