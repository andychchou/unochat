import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function roomCodeGenerator(length) {
    let code = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charsLength = chars.length;
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return code;
}

function Home() {
    const [roomCode, setRoomCode] = useState('');

    return (
        <div className="container">
            <div className="row">
                <div className='Homepage'>
                    <div className='homepage-menu'>
                        <img src={require('../assets/uno.png').default} width='200px' alt='Uno Logo' />
                        <div className='homepage-form'>
                            <div className='homepage-join'>
                                <input type='text' placeholder='Game Code' onChange={(event) => setRoomCode(event.target.value)} />
                                <Link to={`/game?roomCode=${roomCode}`}><button className="btn btn-primary my-2">JOIN GAME</button></Link>
                            </div>
                            <h1>OR</h1>
                            <div className='homepage-create'>
                                <Link to={`/game?roomCode=${roomCodeGenerator(5)}`}><button className="btn btn-success my-2">CREATE GAME</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;