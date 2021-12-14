import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import Game from './Game';

class Main extends Component {
    render() {
        const HomePage = () => {
            return (
                <Home
                    // pass down props here
                />
            )
        }

        const GamePage = () => {
            return (
                <Game
                    // content here
                />
            )
        }

        return(
            <div>
                <p>Main loaded</p>
                <Switch>
                    <Route exact path='/'>{HomePage}</Route>
                    <Route exact path='/game'>{GamePage}</Route>
                    <Redirect to='/' />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Main);