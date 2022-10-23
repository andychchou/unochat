import React, { useEffect, useState, useCallback } from 'react';
import { Form, InputGroup, Modal, Button, ButtonGroup } from 'react-bootstrap';
import { useSocket } from '../SocketProvider';

function Uno({ room, host, user }) {
    const socket = useSocket();

    const [startToggle, setStartToggle] = useState(false);

    const [maxPlayers, setMaxPlayers] = useState([]);
    const [playersList, setPlayersList] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(true);
    const [winner, setWinner] = useState(0);
    const [turn, setTurn] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [playerSeat, setPlayerSeat] = useState(-1);
    const [currentColor, setCurrentColor] = useState('');
    const [currentNumber, setCurrentNumber] = useState('');
    const [discardPile, setDiscardPile] = useState([]);
    const [drawCardPile, setDrawCardPile] = useState([]);
    const [playDirection, setPlayDirection] = useState(true);
    const [playerBaseHandCount, setPlayerBaseHandCount] = useState(0);
    const [playerAcrossHandCount, setPlayerAcrossHandCount] = useState(0);
    const [colorSelection, setColorSelection] = useState(false);

    const startGame = () => {
        socket.emit('startGame', { room })
    }

    const joinGame = () => {
        // setPlayersList([...playersList, user])
        socket.emit('joinGame', { user, room })
    }

    const onCardDrawnHandler = () => {

    }

    const onCardPlayedHandler = (playedCard) => {
        socket.emit('cardPlayed', { playedCard })
    }

    const onCardClicked = (event, card) => {
        console.log("card: " + card);
        console.log("turn: " + turn);
        console.log("playerSeat: " + playerSeat);
        console.log("currentNumber: " + currentNumber);
        console.log("currentColor: " + currentColor);
        if (turn === playerSeat) {
            const isPlayable = (card) => {
                if (card.charAt(0) === currentNumber) return true;
                if (card.charAt(1) === currentColor) return true;
                if (card === 'W') return true;
                return false;
            }

            if (isPlayable(card)) {
                console.log("You played " + card)
                onCardPlayedHandler(card);
            } else if (card === 'D4W') {
                const playableCards = playerHand.filter(card => isPlayable(card));
                if (playableCards.length = 0) {
                    onCardPlayedHandler(card);
                } else {
                    console.log("You played Draw 4 illegally.");
                    onCardPlayedHandler(card);
                }
            } else {
                console.log("You cannont play this card.");
            }
        }
    }

    const colorSelect = (event) => {
        const colorSelected = event.target.value;
        socket.emit('colorSelected', { colorSelected })
        setColorSelection(false);
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
                setPlayerAcrossHandCount(gameState.playerHandsCounts[1]);
            } else if (playerSeat === 1) {
                setPlayerAcrossHandCount(gameState.playerHandsCounts[0]);
            } else {
                setPlayerBaseHandCount(gameState.playerHandsCounts[0]);
                setPlayerAcrossHandCount(gameState.playerHandsCounts[1]);
            }
            setDiscardPile(gameState.discardPile);
            setTurn(gameState.turn);
            setPlayDirection(gameState.playDirection);
            setCurrentNumber(gameState.currentNumber);
            setCurrentColor(gameState.currentColor);
            socket.emit('requestHandState');
        })

        socket.on('updateHandState', ({ hand }) => {
            setPlayerHand(hand);
        })

        socket.on('requestColor', () => {
            setColorSelection(true);
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
                        <RenderPlayerBaseHandDisplay playerSeat={playerSeat} playerHand={playerHand} handCount={playerBaseHandCount} onCardClicked={onCardClicked} />
                    </div>
                </div>
            </div>
            <Modal
                show={colorSelection}
                size="sm"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Select Color</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ButtonGroup onClick={colorSelect}>
                        <Button value="R">Red</Button>
                        <Button value="G">Green</Button>
                        <Button value="B">Blue</Button>
                        <Button value="Y">Yellow</Button>
                    </ButtonGroup>
                </Modal.Body>
            </Modal>
        </div>
    )
}

// faced-up cards for active player
function RenderPlayerHandDisplay({ playerSeat, playerHand, onCardClicked }) {
    if (playerSeat !== -1) {
        const hand = playerHand.map((card, index) => {
            return (
                <div key={`playerCard${index}`} className="card" onClick={event => onCardClicked(event, card)}>
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

function RenderPlayerBaseHandDisplay({ playerSeat, playerHand, handCount, onCardClicked }) {
    if (playerSeat !== -1) {
        return <RenderPlayerHandDisplay playerSeat={playerSeat} playerHand={playerHand} onCardClicked={onCardClicked} />
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
    // if (gameStarted === true) {
    return (
        <div key={`opponentCard`} className="card">
            <img src={require('../assets/' + 'Deck.png').default} />
        </div>
    )
    // } else {
    //     return <div />
    // }
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