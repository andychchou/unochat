import React, { useEffect, useState, useCallback } from 'react';
import { useSocket } from '../SocketProvider';

function Uno(props) {
    const socket = useSocket();

    const [gameOver, setGameOver] = useState(true)
    const [winner, setWinner] = useState(0)
    const [turn, setTurn] = useState(0)
    const [playerHand, setPlayerHand] = useState([])
    const [playerSeat, setPlayerSeat] = useState(0)
    const [currentColor, setCurrentColor] = useState('')
    const [currentNumber, setCurrentNumber] = useState('')
    const [playedCardsPile, setPlayedCardsPile] = useState([])
    const [drawCardPile, setDrawCardPile] = useState([])

    const onCardPlayedHandler = (playedCard) => {

    }

    const onCardDrawnHandler = () => {

    }

    // On component mount
    useEffect(() => {
        
    }, [])

    // Socket stuff
    useEffect(() => {

    }, [socket])

    return (
        <div className="col-sm-auto">
            <div className="unobox">
                Uno Game Here, will take 600px width across.
            </div>
        </div>
    )
}

export default Uno;