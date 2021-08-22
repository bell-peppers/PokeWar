import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  selectAttack,
  _clearPlayerTurn,
  _clearAttackedPokemon,
} from '../store/playerTurn';

import {attackOpponent} from '../store/pokemon';
import MoveBlock from './MoveBlock';
import {sendPlayerMoves} from '../store/game';

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
  selected: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
  },
}));
const Actionbar = (props) => {
  const {
    playerPokemon,
    selectAttack,
    playerTurn,
    sendMoves,
    clearPlayerTurn,
    attackedPokemon,
    clearAttackedPokemon,
    opponentPokemon,
    attackOpponent,
    playerMoves,
  } = props;
  const classes = useStyles();
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState({
    moves: [],
  });
  const [selectedMove, setSelectedMove] = useState({});

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

  function selectMove(move) {
    console.log('move', move);
    const alreadyPicked = playerTurn.filter(
      (turn) => turn.pokemon === selectedPlayerPokemon.name
    );
    console.log(alreadyPicked.length);
    if (alreadyPicked.length > 0) {
      alert('you have already chosen a move for this pokemon');
    } else if (playerTurn.length === 3) {
      alert("you can't chose more than three moves!");
    } else {
      setSelectedMove(move);
      selectAttack(selectedPlayerPokemon, move);
    }
  }

  function completeTurnHandler() {
    const user = 'player1';
    const sendMove = playerTurn.map((move, index) => {
      return {...move, attackedPokemon: attackedPokemon[index]};
    });

    // sendMoves(playerTurn, attackedPokemon, user);
    sendMoves(sendMove, user);
    // attackOpponent(opponentPokemon, playerMoves);
    attackOpponent(opponentPokemon, sendMove);

    clearPlayerTurn();
    clearAttackedPokemon();
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
                  <img src={value.sprites.front_default} />
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
          {selectedPlayerPokemon.moves.length > 0
            ? selectedPlayerPokemon.moves.map((value, i) => (
                <Grid key={i} item>
                  {/* <MoveBlock move={value} selectMove={selectMove} /> */}
                  <Paper
                    className={classes.skill}
                    onClick={() => selectMove(value.move)}
                  >
                    <p>{value.move.name}</p>
                  </Paper>
                </Grid>
              ))
            : [1, 2, 3].map((value) => (
                <Grid key={value} item>
                  <Paper className={classes.skill}>
                    <p></p>
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
          onClick={() => completeTurnHandler()}
        >
          Complete turn
        </Button>
      </Grid>
    </div>
  );
};
const mapState = (state) => {
  return {
    playerPokemon: state.pokemon.playerOnePokemon,
    playerTurn: state.playerTurn.playerTurn,
    playerMoves: state.game.playerMoves,
    attackedPokemon: state.playerTurn.attackedPokemon,
    opponentPokemon: state.pokemon.playerTwoPokemon,
  };
};
const mapDispatch = (dispatch) => {
  return {
    selectAttack: (pk, move) => dispatch(selectAttack(pk, move)),
    sendMoves: (moves, attacked, user) =>
      dispatch(sendPlayerMoves(moves, attacked, user)),
    clearPlayerTurn: () => dispatch(_clearPlayerTurn()),
    clearAttackedPokemon: () => dispatch(_clearAttackedPokemon()),
    attackOpponent: (opponentPokemon, playerMoves) =>
      dispatch(attackOpponent(opponentPokemon, playerMoves)),
  };
};
export default connect(mapState, mapDispatch)(Actionbar);
