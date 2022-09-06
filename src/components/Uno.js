import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useSocket } from '../SocketProvider';

function Uno({ room, host, user }) {
    const socket = useSocket();

    const [startToggle, setStartToggle] = useState(false)

    const [playersList, setPlayersList] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(true)
    const [winner, setWinner] = useState(0)
    const [turn, setTurn] = useState(0)
    const [playerHand, setPlayerHand] = useState([])
    const [playerSeat, setPlayerSeat] = useState(0)
    const [currentColor, setCurrentColor] = useState('')
    const [currentNumber, setCurrentNumber] = useState('')
    const [playedCardsPile, setPlayedCardsPile] = useState([])
    const [drawCardPile, setDrawCardPile] = useState([])
    const [playerBaseHandCount, setPlayerBaseHandCount] = useState(0)
    const [playerAcrossHandCount, setPlayerAcrossHandCount] = useState(0)

    const onCardPlayedHandler = (playedCard) => {

    }

    const onCardDrawnHandler = () => {

    }

    function startGame() {
        setPlayerHand(['Blue_0', 'Blue_1']);
        setPlayerAcrossHandCount(5);
        setPlayerSeat(1);
    }

    function joinGame() {
        setPlayersList([...playersList, user])
    }

    // On component mount
    useEffect(() => {
        socket.emit('requestGameState', { room });
    }, [])

    // Socket stuff
    useEffect(() => {
        if (!socket) {
            return
        }
    }, [socket])

    return (
        <div className="col-sm-auto">
            <div className="unobox">
                <p>Uno Game Here, will take 600px width across.</p>
                <div>
                    <CardsDownCountToHand handCount={playerAcrossHandCount} />
                </div>
                <div>
                    <span>
                        <StartJoinGameButton host={host} user={user} playersList={playersList} gameStarted={gameStarted} startGame={startGame} joinGame={joinGame} />
                    </span>
                </div>
                <div>
                    <RenderPlayerBaseHandDisplay playerSeat={playerSeat} playerHand={playerHand} handCount={playerBaseHandCount} />
                </div>
            </div>
        </div>
    )
}

// faced-up cards for active player
function RenderPlayerHandDisplay({ playerSeat, playerHand }) {
    if (playerSeat !== 0) {
        const hand = playerHand.map((card, index) => {
            return (
                <div key={`playerCard${index}`} className="card">
                    <img src={require('../assets/' + card + '.png').default} />
                </div>
            )
        })
        return hand;
    } else {
        return <div />
    }
}

// faced-down cards render
function CardsDownCountToHand({ handCount }) {
    const handArray = []
    if (handCount > 0) {
        for (let i = 0; i < handCount; i++) {
            handArray.push(
                <div key={`opponentCard${i}`} className="card">
                    <img src={require('../assets/' + 'Deck.png').default} />
                </div>
            )
        }
    }
    return handArray
}

function RenderPlayerBaseHandDisplay({ playerSeat, playerHand, handCount }) {
    if (playerSeat !== 0) {
        return <RenderPlayerHandDisplay playerSeat={playerSeat} playerHand={playerHand} />
    } else {
        return <CardsDownCountToHand handCount={handCount} />
    }
}

function StartJoinGameButton({ host, user, gameStarted, startGame, joinGame }) {
    if (gameStarted === false) {
        if (host === user) {
            return <Button onClick={startGame}>Start Game</Button>
        } else {
            // players list logic
            return <Button onClick={joinGame}>Join Game</Button>
        }
    } else {
        return <span></span>
    }
}

// Test functions


export default Uno;