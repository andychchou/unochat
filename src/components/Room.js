import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from './Chat';
import Game from './Game';

function Room() {
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
        <Game />
    );
}

export default Room;