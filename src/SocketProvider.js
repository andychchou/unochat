import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const ENDPOINT = 'http://localhost:3000'
    const [socket, setSocket] = useState();

    useEffect(() => {
        // const socket = Socket.io("http://localhost:3000", { transports: ['websocket'] });
        const connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000, 
            "transports" : ["websocket"]
        }
        const newSocket = io.connect(ENDPOINT, connectionOptions)
        setSocket(newSocket)

        newSocket.on('message', message => {
            console.log(message);
        });

        // return () => newSocket.close()
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}