import React, { useEffect, useState, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useSocket } from '../SocketProvider';

function Chat({user, userList}) {
    
    const [convo, setConvo ] = useState([]);
    const [text, setText] = useState('');
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({smooth: true})
        }
    }, [])

    const socket = useSocket();

    const messages = convo.map(message => {
        const name = message.sender;
        const fromMe = (user === message.sender);
        return {...message, senderName: name, fromMe }
    });

    const addMessageToConvo = useCallback(({ text, sender }) => {
        const newMessage = { text, sender };
        setConvo([...convo, newMessage]);
    }, [convo])

    function sendMessage(text) {
        socket.emit('send-message', {text, sender: user});
        addMessageToConvo({ text, sender: user })
    }

    function handleSubmit() {
        sendMessage(text);
        setText('');
    }

    useEffect(() => {
        if (socket == null) {
            return
        }
        socket.on('receive-message', addMessageToConvo);
        
        return () => socket.off('receive-message')
    }, [socket, addMessageToConvo])

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (text !== '') {
                    handleSubmit();
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });
    
    return (
        <div className="col-md">
            <div className="row">
                <div className="col-2">
                    Users List
                    <ul className="p-0 m-0" type="none">
                        {userList.map(user => {
                            return <li key={userList.indexOf(user)}>{user}</li>
                        })}
                    </ul>
                </div>
                <div className="col-10">
                    <div className="row">
                        Your username: {user}
                    </div>
                    <div className="d-flex flex-column flex-grow-1 overflow-auto" style={{ height: '360px'}}>
                        <div className="d-flex flex-column align-items-start justify-content-end px-2">

                            {messages.map((message, index) => {
                                const lastMessage = messages.length - 1 === index
                                return (
                                    <div
                                        ref={lastMessage ? setRef : null}
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
                <Form onSubmit={e => {
                    e.preventDefault();
                    handleSubmit()
                }}>
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
            </div>
        </div>
    );
}

export default Chat;