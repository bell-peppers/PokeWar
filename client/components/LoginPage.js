import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    backgroundColor: 'green',
    width: '100%',
    height: '600px',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    height: '325px',
    border: '5px solid red',
    padding: '15px',
    backgroundColor: 'white',
  },
}));
const LoginPage = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.main}>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          POKEWARS
        </Grid>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <form className={classes.form} noValidate autoComplete='off'>
            <TextField
              label='Username'
              id='filled-start-adornment'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'> </InputAdornment>
                ),
              }}
              variant='filled'
            />
            <TextField
              label='E-mail'
              id='filled-start-adornment'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'> </InputAdornment>
                ),
              }}
              variant='filled'
            />
            <TextField
              label='Password'
              id='filled-start-adornment'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'> </InputAdornment>
                ),
              }}
              variant='filled'
            />
            <Button
              variant='contained'
              style={{width: '100px', position: 'relative', left: '125px'}}
            >
              Log in
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
const mapState = (state) => {
  return {
    playerPokemon: state.pokemon.playerOnePokemon,
  };
};
const mapDispatch = (dispatch) => {
  return {};
};
export default connect(mapState, mapDispatch)(LoginPage);
