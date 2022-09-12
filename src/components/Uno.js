import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useSocket } from '../SocketProvider';

function Uno({ room, host, user }) {
    const socket = useSocket();

    const [startToggle, setStartToggle] = useState(false)

    const [maxPlayers, setMaxPlayers] = useState([])
    const [playersList, setPlayersList] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(true)
    const [winner, setWinner] = useState(0)
    const [turn, setTurn] = useState(0)
    const [playerHand, setPlayerHand] = useState([])
    const [playerSeat, setPlayerSeat] = useState(-1)
    const [currentColor, setCurrentColor] = useState('')
    const [currentNumber, setCurrentNumber] = useState('')
    const [discardPile, setDiscardPile] = useState([])
    const [drawCardPile, setDrawCardPile] = useState([])
    const [playDirection, setPlayDirection] = useState(true)
    const [playerBaseHandCount, setPlayerBaseHandCount] = useState(0)
    const [playerAcrossHandCount, setPlayerAcrossHandCount] = useState(0)

    const onCardPlayedHandler = (playedCard) => {

    }

    const onCardDrawnHandler = () => {

    }

    function startGame() {
        socket.emit('startGame', { room })
    }

    function joinGame() {
        // setPlayersList([...playersList, user])
        socket.emit('joinGame', { user, room })
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

        socket.on('updateGameState', ({ gameState }) => {
            setGameStarted(gameState.gameStarted);
            setMaxPlayers(gameState.maxPlayers);
            setPlayersList(gameState.players);
            const playerIndex = gameState.players.indexOf(user);
            setPlayerSeat(playerIndex);
            if (playerSeat === 0) {
                setPlayerAcrossHandCount(gameState.playerHandsCounts[1])
            } else if (playerSeat === 1) {
                setPlayerAcrossHandCount(gameState.playerHandsCounts[0])
            } else {
                setPlayerBaseHandCount(gameState.playerHandsCounts[0])
                setPlayerAcrossHandCount(gameState.playerHandsCounts[1])
            }
            setDiscardPile(gameState.discardPile);
            setTurn(gameState.turn);
            setPlayDirection(gameState.playDirection);
            socket.emit('requestHandState');
        })

        socket.on('updateHandState', ({ hand }) => {
            setPlayerHand(hand);
        })

    }, [socket])

    return (
        <div className="col-sm-auto">
            <div className="d-flex flex-column unobox">
                <div className="row">
                    <div>
                        <CardsDownCountToHand handCount={playerAcrossHandCount} />
                    </div>
                </div>
                <div className="row center-row">
                    <div className='col-4'></div>
                    <div className='col-4 d-flex flex-column'>
                        <div className='row my-4'>
                            <StartJoinGameButton host={host} user={user} gameStarted={gameStarted} playersList={playersList} maxPlayers={maxPlayers} startGame={startGame} joinGame={joinGame} />
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <RenderDeck gameStarted={gameStarted} />
                            </div>
                            <div className='col'>
                                <RenderDiscard discardPile={discardPile} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col d-flex justify-content-start'>
                                <p>Deck</p>
                            </div>
                            <div className='col d-flex justify-content-start'>
                                <p>Discard</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'></div>
                </div>
                <div className="row">
                    <div className="">
                        <RenderPlayerBaseHandDisplay playerSeat={playerSeat} playerHand={playerHand} handCount={playerBaseHandCount} />
                    </div>
                </div>
            </div>
        </div>
    )
}

// faced-up cards for active player
function RenderPlayerHandDisplay({ playerSeat, playerHand }) {
    if (playerSeat !== -1) {
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
    if (playerSeat !== -1) {
        return <RenderPlayerHandDisplay playerSeat={playerSeat} playerHand={playerHand} />
    } else {
        return <CardsDownCountToHand handCount={handCount} />
    }
}

function StartJoinGameButton({ host, user, gameStarted, playersList, maxPlayers, startGame, joinGame }) {
    if (host === user) {
        if (gameStarted === false) {
            if (playersList.length > 1) {
                return <Button onClick={startGame}>Start Game</Button>
            } else {
                return <p>Waiting for players to join...</p>
            }
        } else {
            return <Button>Restart Game</Button>
        }
    } else {
        if (playersList.length < maxPlayers) {
            return <Button onClick={joinGame}>Join Game</Button>
        } else {
            return <div />
        }
    }
}

function RenderDeck({ gameStarted }) {
    if (gameStarted === true) {
        return (
            <div key={`opponentCard`} className="card">
                <img src={require('../assets/' + 'Deck.png').default} />
            </div>
        )
    } else {
        return <div />
    }
}

function RenderDiscard({ discardPile }) {
    if (discardPile.length > 0) {
        const card = discardPile[discardPile.length - 1];
        return (
            <div key={`discard`} className="card">
                <img src={require('../assets/' + card + '.png').default} />
            </div>
        )
    } else {
        return <div />
    }
}

// Test functions


export default Uno;