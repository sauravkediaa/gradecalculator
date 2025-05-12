import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function FeedbackButton() {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button
                title="Give feedback"
                onClick={() => setShow(true)}
                style={{ position: 'fixed', bottom: 20, right: 20, borderRadius: '50%' }}
            >💬</Button>


            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton><Modal.Title>Feedback</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form action="https://forms.gle/yourForm" target="_blank">
                        <Form.Group className="mb-3">
                            <Form.Label>Your feedback</Form.Label>
                            <Form.Control as="textarea" rows={3} name="entry.123" />
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
