import React, { useEffect, useState, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

function Chat(props) {
    const [user, setUser] = useState();
    const [convo, setConvo ] = useState([{text: 'line 1', sender: 'person1'}]);
    const [text, setText] = useState('');

    const idRef = useRef();
    
    const messages = convo.map(message => {
        const name = message.sender;
        const fromMe = (user === message.sender);
        return {...message, senderName: name, fromMe }
    });

    function addMessageToConvo({ text, sender }) {
        const newMessage = { text, sender };
        setConvo([...convo, newMessage]);
    }

    function sendMessage(text) {
        addMessageToConvo({ text, sender: user })
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(text);
        setText('');
    }

    function handleSubmitName(e) {
        e.preventDefault();
        setUser(idRef.current.value);
    }

    return (
        <div className="col">
            <div className="row">
                <div className="col-sm-2">
                    Users List
                </div>
                <div className="col-sm-10">
                    <div className="d-flex flex-column flex-grow-1 overflow-auto" style={{ height: '360px'}}>
                        <div className="d-flex flex-column align-items-start justify-content-end px-2">
                            Convo here
                            {messages.map((message, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end': ''}`}
                                    >
                                        <div 
                                            className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}
                                        >
                                            {message.text}
                                        </div>
                                        <div
                                            className={`text-muted small ${message.fromMe ? 'text-end' : 'text-start'}`}
                                        >
                                            {message.fromMe ? 'You' : message.senderName }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                required
                                value={text}
                                onChange={e => setText(e.target.value)}
                                style={{ height: '72px', resize: 'none' }}
                            />
                            <Button type="submit">Send</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
                <Form onSubmit={handleSubmitName}>
                    <Form.Group>
                        <InputGroup>
                            <Form.Label>Enter Username</Form.Label>
                            <Form.Control
                                as="textarea"
                                ref={idRef}
                                required
                                style={{ height: '75px', resize: 'none' }}
                            />
                            <Button type="submit">Enter</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
                <div className="row">
                Your username: {user}
                </div>
            </div>
        </div>
    );
}

export default Chat;