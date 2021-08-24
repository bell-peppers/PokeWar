import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './components/Main';
import { me } from './store';
import MatchSearch from './components/MatchSearch';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import AllPokemon from './components/AllPokemon';
import temp from './components/PracticeFile';

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    // const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route path='/' exact component={MatchSearch} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/myprofile' exact component={UserProfile} />
        <Route path='/gameboard' exact component={Main} />
        <Route path='/dev/setup' component={temp} />
        <Route path='/allpokemon' exact component={AllPokemon} />
      </Switch>
    );
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, null)(Routes));
