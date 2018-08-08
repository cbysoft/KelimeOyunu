import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import GamePage from './GamePage';
import MainPage from './MainPage';
import ProfilPage from './ProfilPage';
import Game1 from './Game1';
import Game2 from './Game2';
import Game3 from './Game3';
import Game4 from './Game4';
import Game5 from './Game5';
import Loading from './Loading';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import CreateAccount from './CreateAccount';

const Index = () => {
    return (
        <Router>
            <Scene>
                <Scene
                    key="Game1"
                    component={Game1}
                    title="Game1"
                    hideNavBar='false'

                />
                <Scene
                    key="Game2"
                    component={Game2}
                    title="Game1"
                    hideNavBar='false'

                />
                <Scene
                    key="Game3"
                    component={Game3}
                    title="Game3"
                    hideNavBar='false'

                />
                <Scene
                    key="Game4"
                    component={Game4}
                    title="Game4"
                    hideNavBar='false'

                />
                <Scene
                    key="Game5"
                    component={Game5}
                    title="Game1"
                    hideNavBar='false'

                />
                <Scene
                    key="Loading"
                    component={Loading}
                    title="Game1"
                    hideNavBar='false'
                    initial
                />
                <Scene
                    key="Login"
                    component={Login}
                    title="Game1"
                    hideNavBar='false'

                />

                <Scene
                    key="ForgotPassword"
                    component={ForgotPassword}
                    title="Game1"
                    hideNavBar='false'

                />
                <Scene
                    key="ResetPassword"
                    component={ResetPassword}
                    title="Game1"
                    hideNavBar='false'

                />
                <Scene
                    key="MainPage"
                    component={MainPage}
                    title="MainPage"
                    hideNavBar='false'

                />
                <Scene
                    key="GamePage"
                    component={GamePage}
                    title="GamePage"
                    hideNavBar='false'


                />
                <Scene
                    key="CreateAccount"
                    component={CreateAccount}
                    title="CreateAccount"
                    hideNavBar='false'

                />
                <Scene
                    key="ProfilPage"
                    component={ProfilPage}
                    title="ProfilPage"
                    hideNavBar='false'

                />

            </Scene>
        </Router>
    );
}
AppRegistry.registerComponent('kelimeOyunu', () => Index);
export default Index;