import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './components/Main';
// import { Login, Signup } from './components/AuthForm';
import { me } from './store';
import MatchSearch from './components/MatchSearch';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {/* {isLoggedIn ? (
          <Switch>
            <Route path='/' component={MatchSearch} />
            <Redirect to='/' />
          </Switch>
        ) : ( */}
        <Switch>
          <Route path='/' exact component={MatchSearch} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/myprofile' exact component={UserProfile} />
          <Route path='/gameboard' exact component={Main} />
          {/* <Route path='/login' component={Login} /> */}
          {/* <Route path='/signup' component={Signup} /> */}
        </Switch>
        {/* )} */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
