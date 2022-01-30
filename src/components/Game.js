import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';
import Chat from './Chat';
import Uno from './Uno';
import { useSocket } from '../SocketProvider';

function Game({room}) {
    const [showModal, setShowModal] = useState(true);
    const [user, setUser] = useState();
    const userRef = useRef();
    const [userList, setUserList] = useState([]);
    const [retryName, setRetryName] = useState(false);

    const socket = useSocket();

    function handleSubmit() {
        setUser(userRef.current.value);
        setShowModal(false);
        socket.emit('tryJoinRoom', { user: userRef.current.value , room: room });
    }

    function userExists(userList) {
        setUserList(userList);
        setRetryName(true);
        setShowModal(true);
    }

    useEffect(() => {
        if (!socket) {
            return
        }
        // Update userList
        socket.on('roomUsers', ({ users }) => {
            setUserList(users.map(userObj => userObj.user));
        });
        // User name already exists, retry
        socket.on('userExists', (userList) => {
            userExists(userList);
        });
        // Join room success
        socket.on('joinRoomOK', ({user}) => {
            socket.emit('joinRoom', { user, room: room })
        });
    }, [socket, room])

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    Room Code: {room}
                </div>
                <div className="row">
                    <Uno />
                    <Chat user={user} userList={userList}/>
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
                    <RetryMsg retryName={retryName} userList={userList}/>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
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

function RetryMsg({retryName, userList}) {
    if (retryName) {
        return (
            <div>
                <h5>Username taken, choose another username.</h5>
                <h5>Current users: {userList.join(', ')}</h5>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default Game;