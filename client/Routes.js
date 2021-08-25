import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  withRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import MatchSearch from './components/MatchSearch';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import PreGame from './components/PreGame';
import AllPokemon from './components/AllPokemon';
import temp from './components/PracticeFile';
import SignupPage from './components/SignupPage';
import {useAuth} from '../src/contexts/AuthContext';

/**
 * COMPONENT
 */
const Routes = () => {
  const {currentUser} = useAuth();
  return (
    <Router>
      {!currentUser ? (
        <div>
          <Switch>
            <Route path='/' exact component={MatchSearch} />
            <Route path='/allpokemon' exact component={AllPokemon} />
            <Route path='/pregame' exact component={PreGame} />
            <Route path='/game' exact component={Main} />

            <Route path='/dev/setup' component={temp} />
            <Route path='/login' exact component={LoginPage} />
            <Route path='/signup' exact component={SignupPage} />
            <Route path='*' component={FourOhFour} />
          </Switch>
        </div>
      ) : (
        <div>
          <Switch>
            <Route path='/' exact component={MatchSearch} />
            <Route path='/allpokemon' exact component={AllPokemon} />
            <Route path='/game' exact component={Main} />
            <Route path='/pregame' exact component={PreGame} />
            <Route path='/dev/setup' component={temp} />
            <Route path='/myprofile' exact component={UserProfile} />
            <Route path='/login' exact component={AlreadyLoggedIn} />
            <Route path='/signup' exact component={AlreadyLoggedIn} />
            <Route path='*' component={FourOhFour} />
          </Switch>
        </div>
      )}
    </Router>
  );
};

const AlreadyLoggedIn = () => {
  return <div>Sorry, it seems like you are already logged in!</div>;
};

const FourOhFour = () => {
  return <div>Sorry, this page doesn't exist</div>;
};
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, null)(Routes));
