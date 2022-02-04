import React, { useEffect, useState, useCallback } from 'react';
import { useSocket } from '../SocketProvider';

function Uno() {
    const socket = useSocket();

    const [gameOver, setGameOver] = useState(true)
    const [winner, setWinner] = useState(0)
    const [maxPlayers, setMaxPlayers] = useState(0)
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
            <div className="">
                Uno Game Here, Will take ~360px width across.
            </div>
        </div>
    )
}

export default Uno;