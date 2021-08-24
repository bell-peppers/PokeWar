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
import {AuthProvider} from '../src/contexts/AuthContext';

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    const {isLoggedIn} = this.props;

    return (
      <Router>
        {/* <AuthProvider> */}
        <Switch>
          <Route path='/' exact component={MatchSearch} />
          <Route path='/allpokemon' exact component={AllPokemon} />
          <Route path='/pregame' exact component={PreGame} />
          <Route path='/game' exact component={Main} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/myprofile' exact component={UserProfile} />
          <Route path='/dev/setup' component={temp} />
          <Route path='/signup' exact component={SignupPage} />
        </Switch>
        {/* </AuthProvider> */}
      </Router>
    );
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, null)(Routes));
