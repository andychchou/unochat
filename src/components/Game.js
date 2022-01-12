import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import io from 'socket.io-client';
import Chat from './Chat';

function Game() {

    return (
        <React.Fragment>
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
            <Modal>

            </Modal>
        </React.Fragment>
    );
}

export default Game;