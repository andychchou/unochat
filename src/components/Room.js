import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import Game from './Game';
import { SocketProvider } from '../SocketProvider';

function Room() {
    const data = queryString.parse(window.location.search);
    const [room, setRoom] = useState(data.roomCode);

    // let socket;
    // const ENDPOINT = 'http://localhost:3000'

    // useEffect(() => {
    //     // const socket = Socket.io("http://localhost:3000", { transports: ['websocket'] });

    //     const connectionOptions =  {
    //         "forceNew" : true,
    //         "reconnectionAttempts": "Infinity", 
    //         "timeout" : 10000, 
    //         "transports" : ["websocket"]
    //     }
    //     socket = io.connect(ENDPOINT, connectionOptions)

    //     socket.on('message', message => {
    //         console.log(message);
    //     });
    // })

    return (
        <SocketProvider>
            <Game room={room}/>
        </SocketProvider>
    );
}

export default Room;