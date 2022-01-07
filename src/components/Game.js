import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from './Chat';

function Game() {
    const ENDPOINT = 'http://localhost:3000'

    useEffect(() => {
        // const socket = Socket.io("http://localhost:3000", { transports: ['websocket'] });

        const connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000, 
            "transports" : ["websocket"]
        }
        const socket = io.connect(ENDPOINT, connectionOptions)

        socket.on('message', message => {
            console.log(message);
        });
    })

    return (
        <div className="container">
            <div className="row">
                <Chat />
            </div>
            <div className="row">
                <div className="col">
                    <p>Game on</p>
                    <Link to={'/'} className="btn btn-primary">Return to Main Menu</Link>
                </div>
            </div>
        </div>
    );
}

export default Game;