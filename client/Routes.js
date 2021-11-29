import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  withRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
  BrowserRouter as Router,
} from 'react-router-dom';
import Main from './components/Main';
import {me} from './store';
import MatchSearch from './components/MatchSearch';
import LoginPage from './components/LoginPage';
import PreGame from './components/PreGame';
import AllPokemon from './components/AllPokemon';
import temp from './components/PracticeFile';
import SignupPage from './components/SignupPage';
import {useAuth} from '../src/contexts/AuthContext';
import Navbar from './components/Navbar';
import EditProfile from './components/EditProfile';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import PostGame from './components/PostGame';
import Store from './components/PokeStore';
import Instructions from './components/Instructions';
import Profile from './components/Profile';
import SinglePlayerChoose from './components/SinglePlayer/SinglePlayerChoose';
import SPMain from './components/SinglePlayer/SPMain';
import ContactUs from './components/ContactUs';
import Loading from './components/Loading';

/**
 * COMPONENT
 */

const Routes = (props) => {
  const {user, myUID, otherUser} = props;
  const {currentUser, findUserProfile} = useAuth();
  const location = useLocation().pathname.slice(7);
  return (
    <Router>
      {/* {!currentUser ? (
        <div> */}

      <Navbar />
      <Switch>
        <Route path='/allpokemon' exact component={AllPokemon} />
        <Route path='/pregame' exact component={PreGame} />
        <Route path='/game' exact component={Main} />
        {/* {user && (
          <Route path={`/users/${user.uid}`} exact component={UserProfile} />
        )} */}
        <Route path={`/profile`} exact component={Profile} />
        <Route path='/dev/setup' component={temp} />
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/post' component={PostGame} />
        <Route path='/editprofile' component={EditProfile} />
        <Route path='/aboutus' exact component={AboutUs} />
        <Route path='/singleplayer' component={SinglePlayerChoose} />
        <Route path='/spgame' component={SPMain} />
        <Route path='/match' component={MatchSearch} />
        <Route
          exact
          path='/'
          component={currentUser ? MatchSearch : LoginPage}
        />
        <Route exact path='/store' component={Store} />
        <Route exact path='/instructions' component={Instructions} />
        <Route exact path='/contact' component={ContactUs} />
        <Route path='*' component={FourOhFour} />
      </Switch>
      <Footer />
    </Router>
  );
};

const AlreadyLoggedIn = () => {
  return <div>Sorry, it seems like you are already logged in!</div>;
};

const FourOhFour = () => {
  return <div>Sorry, this page doesn't exist</div>;
};

const mapState = (state) => {
  return {
    user: state.userData.user,
    myUID: state.userData.myUID,
    otherUser: state.userData.otherUser,
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Routes));
