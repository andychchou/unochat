import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useSocket } from '../SocketProvider';

function Uno(props) {
    const socket = useSocket();

    const [startToggle, setStartToggle] = useState(false)

    const [playersList, setPlayersList] = useState([])
    const [gameOver, setGameOver] = useState(true)
    const [winner, setWinner] = useState(0)
    const [turn, setTurn] = useState(0)
    const [playerHand, setPlayerHand] = useState([])
    const [playerSeat, setPlayerSeat] = useState(0)
    const [currentColor, setCurrentColor] = useState('')
    const [currentNumber, setCurrentNumber] = useState('')
    const [playedCardsPile, setPlayedCardsPile] = useState([])
    const [drawCardPile, setDrawCardPile] = useState([])
    const [opponentHandCount, setOpponentHandCount] = useState(0)

    const onCardPlayedHandler = (playedCard) => {

    }

    const onCardDrawnHandler = () => {

    }

    function startGame() {
        setPlayerHand(['Blue_0', 'Blue_1'])
        setOpponentHandCount(5)
    }

    function joinGame() {

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
                <p>Uno Game Here, will take 600px width across.</p>
                <div>
                    <RenderOpponentHandDisplay handCount={opponentHandCount} />
                </div>
                <div>
                    <span>
                        <Button onClick={startGame}>Start Game</Button>
                    </span>
                </div>
                <div>
                    <RenderPlayerHandDisplay playerHand={playerHand} />
                </div>
            </div>
        </div>
    )
}

function RenderPlayerHandDisplay({ playerHand }) {
    const hand = playerHand.map((card, index) => {
        return (
            <div key={`playerCard${index}`} className="card">
                <img src={require('../assets/' + card + '.png').default} />
            </div>
        )
    })
    return hand;
}

function RenderOpponentHandDisplay({ handCount }) {
    const handArray = [];
    if (handCount > 0) {
        for (let i = 0; i < handCount; i++) {
            handArray.push(
                <div key={`opponentCard${i}`} className="card">
                    <img src={require('../assets/' + 'Deck.png').default} />
                </div>
            )
        }
    }
    return handArray;
}

// Test functions


export default Uno;