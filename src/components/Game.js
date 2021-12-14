import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Game() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <p>Game on</p>
                    <Link to={'/'} className="btn btn-primary">Return to Main Menu</Link>
                </div>
            </div>
        </div>
    )
}

export default Game;