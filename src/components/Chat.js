import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

function Chat(props) {
    const [text, setText] = useState('');
    
    function sendMessage(text) {
        
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(text);
        setText('');
    }

    return (
        <div className="col">
            <div className="row">
                <div className="col">

                </div>
                <div className="col">

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
                                style={{ height: '75px', resize: 'none' }}
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