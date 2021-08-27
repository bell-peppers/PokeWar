import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chat from './Chat';

const useStyles = makeStyles(theme => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'red',
    height: '100%',
    fontFamily: 'Courier New, monospace',
  },
  users: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '95%',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  chat: {
    width: '95%',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Sidebar = props => {
  const classes = useStyles();
  const { feed, user, opponent } = props;

  return (
    <Grid className={classes.sidebar}>
      <Grid className={classes.users}>
        <Grid className={classes.avatar}>
          <Avatar
            className={classes.large}
            alt='Mirana'
            src='/pics/Mirana_icon.png'
          />
          <h3 className='avatar-name'>Username1</h3>
        </Grid>
        <Grid>
          <h1 className='vs'>⚔️</h1>
        </Grid>
        <Grid className={classes.avatar}>
          <Avatar
            className={classes.large}
            alt='Phoenix'
            src='/pics/Phoenix_icon.png'
          />
          <h3 className='avatar-name'>Username2</h3>
        </Grid>
      </Grid>
      <Grid className={classes.chat}>
        <Chat feed={feed} user={user} opponent={opponent} />
      </Grid>
    </Grid>
  );
};

const mapState = state => {
  return {
    feed: state.pokemon.attackFeed,
    user: state.userData.user,
    opponent: state.game.opponentInfo,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(Sidebar);
