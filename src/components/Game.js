import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';
import Chat from './Chat';
import Uno from './Uno';
import { useSocket } from '../SocketProvider';

function Game({ room }) {
    const [showModal, setShowModal] = useState(true);
    const [user, setUser] = useState();
    const userRef = useRef();
    const [userList, setUserList] = useState([]);
    const [retryName, setRetryName] = useState(false);
    const [maxPlayers, setMaxPlayers] = useState(0);
    const maxPlayersRef = useRef();

    const socket = useSocket();

    function handleSubmit() {
        setUser(userRef.current.value);
        setShowModal(false);
        socket.emit('tryJoinRoom', { user: userRef.current.value, room: room });
    }

    function userExists(userList) {
        setUserList(userList);
        setRetryName(true);
        setShowModal(true);
    }

    function handleGameSetup() {
        console.log("gamesetup initiated");
        socket.emit('gameSetup', { room: room, maxPlayers: maxPlayersRef.current.value });
    }

    function handleLeaveRoom() {
        socket.disconnect();
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
        socket.on('joinRoomOK', ({ user }) => {
            socket.emit('joinRoom', { user, room: room, game: 'uno' })
        });
        // After receiving response from setting up game
        socket.on('gameSetupConfirmed', () => {

            // work on code here

            // Set inital game states

        });
    }, [socket, room])

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <p>Room Code: {room}</p>
                    <p>Max Players: {maxPlayers}</p>
                </div>
                <div className="row">
                    <UnoShell maxPlayers={maxPlayers} setMaxPlayers={setMaxPlayers} maxPlayersRef={maxPlayersRef} handleGameSetup={handleGameSetup} />
                    <Chat user={user} userList={userList} />
                </div>
                <div className="row mt-1">
                    <div className="col">
                        <Link
                            to={'/'} className="btn btn-primary"
                            onClick={handleLeaveRoom}
                        >
                            Return to Main Menu
                        </Link>
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
                    <RetryMsg retryName={retryName} userList={userList} />
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
                                    style={{ resize: 'none' }}
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

function RetryMsg({ retryName, userList }) {
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

function UnoShell({ maxPlayers, setMaxPlayers, maxPlayersRef, handleGameSetup }) {
    if (maxPlayers === 0) {
        return <UnoSetup setMaxPlayers={setMaxPlayers} maxPlayersRef={maxPlayersRef} handleGameSetup={handleGameSetup} />
    } else {
        return <Uno />
    }
}

function UnoSetup({ setMaxPlayers, maxPlayersRef, handleGameSetup }) {
    return (
        <div className="col-sm-auto">
            <div className="unobox">
                <h3>Select the number of players: </h3>
                <Form onSubmit={e => {
                    e.preventDefault();
                    setMaxPlayers(maxPlayersRef.current.value);
                    handleGameSetup();
                }}>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control
                                as="select"
                                ref={maxPlayersRef}
                            >
                                <option value="2">(2) Two Players</option>
                                {/* <option value="3">(3) Three Players</option>
                                <option value="4">(4) Four Players</option> */}
                            </Form.Control>
                            <Button type="submit">Create Game</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Game;