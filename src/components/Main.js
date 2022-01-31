import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import Room from './Room';

class Main extends Component {
    render() {
        const HomePage = () => {
            return (
                <Home
                    // pass down props here
                />
            )
        }

        const RoomPage = () => {
            return (
                <Room
                    // content here
                />
            )
        }

        return(
            <div>
                <Switch>
                    <Route exact path='/'>{HomePage}</Route>
                    <Route exact path='/game'>{RoomPage}</Route>
                    <Redirect to='/' />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Main);