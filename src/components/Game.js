import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import Chat from './Chat';

function Game() {
    const [showModal, setShowModal] = useState(true);
    const [user, setUser] = useState();
    const userRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        setUser(userRef.current.value);
        setShowModal(false);
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <Chat user={user}/>
                </div>
                <div className="row">
                    <div className="col">
                        <p>Game on</p>
                        <Link to={'/'} className="btn btn-primary">Return to Main Menu</Link>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                backdrop="static"
                keyboard={false}
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title>Enter a username</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <InputGroup>
                                <Form.Control
                                    as="textarea"
                                    ref={userRef}
                                    required
                                    style={{resize: 'none'}}
                                    autoFocus
                                />
                                <Button type="submit">Enter</Button>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default Game;