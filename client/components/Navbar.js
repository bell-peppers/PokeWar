import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../store';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

const Navbar = () => {
  const history = useHistory();

  return (
    <nav>
      <Link to='/'>
        <h1>PokeWar</h1>
      </Link>
      <div className='nav-right'>
        <Link to='/myprofile' className='nav-avatar'>
          <span>User Name</span>
          <Avatar>U</Avatar>
        </Link>
        <ExitToAppOutlinedIcon
          fontSize='large'
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/login')}
        />
      </div>
    </nav>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
