import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    backgroundColor: 'green',
    width: '100%',
    height: '25%',
    justifyContent: 'flex-start',
  },
  root: {
    padding: 0,
    margin: 0,
    flexWrap: 'nowrap',
    maxWidth: '400px',
  },
  card: {
    height: 140,
    width: 100,
  },
  skill: {
    height: 50,
    width: 50,
  },
  actionBar: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: '20px',
  },
}));
const Actionbar = (props) => {
  const {playerPokemon} = props;
  const classes = useStyles();
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState({
    moves: [],
  });

  useEffect(() => {
    if (playerPokemon.length > 0) {
      console.log(playerPokemon);
      setSelectedPlayerPokemon(playerPokemon[0]);
      console.log(selectedPlayerPokemon);
    }
  }, []);
  function selectPokemon(pokemon) {
    setSelectedPlayerPokemon(pokemon);
  }

  return (
    <div className={classes.actionBar}>
      <Grid container className={classes.root} spacing={1}>
        <Grid style={{position: 'absolute', left: '173px', bottom: '150px'}}>
          My deck:
        </Grid>
        <Grid item xs={12}>
          {/* 5, 7, 9*/}
          <Grid
            container
            style={{display: 'flex', flexWrap: 'nowrap'}}
            spacing={3}
          >
            {playerPokemon.map((value) => (
              <Grid key={value.id} item>
                <Paper
                  className={classes.card}
                  onClick={() => {
                    selectPokemon(value);
                  }}
                >
                  <p>{value.name}</p>
                  <img src={value.frontImg} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '5px solid red',
          maxWidth: '250px',
        }}
      >
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          Choose the attack:
        </Grid>
        <Grid
          container
          style={{display: 'flex', justifyContent: 'center'}}
          spacing={3}
        >
          {!!selectedPlayerPokemon.moves &&
            selectedPlayerPokemon.moves.map((value) => (
              <Grid key={value.id} item>
                <Paper className={classes.skill}>
                  <p>{value.move}</p>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxHeight: '170px',
        }}
      >
        <Button
          style={{
            backgroundColor: 'red',
            height: '45px',
          }}
        >
          Complete turn
        </Button>
      </Grid>
    </div>
  );
};
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    playerPokemon: state.pokemon.playerOnePokemon,
  };
};
const mapDispatch = (dispatch) => {
  return {};
};
export default connect(mapState, mapDispatch)(Actionbar);
