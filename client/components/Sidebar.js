import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chat from './Chat';

const useStyles = makeStyles(() => ({
  sidebar: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    // justifyContent: 'center',
  },
  users: {
    display: 'flex',
    flexDirection: 'row',
    height: '150px',
    justifyContent: 'space-between',
  },
}));

const Sidebar = props => {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: 'blue', height: '100%' }}>
      <Grid style={{ display: 'flex', justifyContent: 'center' }}>sidebar</Grid>
      <div className={classes.sidebar}>
        <div>
          <Grid container className={classes.users}>
            <Grid>
              Username1
              <Avatar alt='Mirana' src='/pics/Mirana_icon.png' />{' '}
            </Grid>
            <Grid>
              Username2
              <Avatar alt='Phoenix' src='/pics/Phoenix_icon.png' />
            </Grid>
          </Grid>
        </div>
        <Chat />
      </div>
    </div>
  );
};

const mapState = state => {
  return {
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(Sidebar);
