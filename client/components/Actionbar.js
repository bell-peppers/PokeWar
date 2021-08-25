import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  selectAttack,
  _clearPlayerTurn,
  _clearAttackedPokemon,
  _setCalculatedAttacks,
} from '../store/playerTurn';
import {_selectedPlayerPokemon} from '../store/playerTurn';
import {applyMoves, attackOpponent} from '../store/pokemon';
//import MoveBlock from './MoveBlock';
import {sendPlayerMoves} from '../store/game';
import calculateTurn from '../../utils/calculateTurn';

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
  selectedSkill: {
    height: 50,
    width: 50,
    boxShadow: '1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',
  },
  actionBar: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  selected: {
    height: 140,
    width: 100,
    boxShadow: '1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',
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
    selectedPlayerPk,
    selectPlayerPokemon,
    playerAttack,
    isTurn,
    changeTurns,
    role,
    username,
    opponentMoves,
    setCalculatedAttacks,
    calculatedAttacks,
    applyMoves,
  } = props;
  const classes = useStyles();
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState({
    moves: [],
  });

  useEffect(() => {}, []);
  function selectPokemon(pokemon) {
    setSelectedPlayerPokemon(pokemon);
    selectPlayerPokemon(pokemon);
  }

  function selectMove(move) {
    const alreadyPicked = playerTurn.filter(
      (turn) => turn.pokemon === selectedPlayerPokemon.name
    );
    if (alreadyPicked.length > 0) {
      alert('you have already chosen a move for this pokemon');
    } else if (playerTurn.length === 3) {
      alert("you can't chose more than three moves!");
    } else {
      selectAttack(selectedPlayerPokemon, move);
    }
  }

  function completeTurnHandler() {
    // const user = 'player1';
    // const sendMove = playerTurn.map((move, index) => {
    //   return {...move, attackedPokemon: attackedPokemon[index]};
    // });
    if (role === 'guest') {
      sendMoves(playerTurn, username);
    } else if (role === 'host') {
      //make sure we have moves
      if (opponentMoves) {
        const thisTurn = calculateTurn(playerTurn, opponentMoves);
        setCalculatedAttacks(thisTurn);
        sendMoves(thisTurn, username);
        //apply
        applyMoves(thisTurn, playerPokemon, opponentPokemon);
      }

      //apply to opppk
      //turn over
    }
    changeTurns();
    clearPlayerTurn();
    clearAttackedPokemon();
    selectPlayerPokemon({});
  }
  return (
    <div className={classes.actionBar}>
      <Grid container className={classes.root} spacing={1}>
        <Grid style={{position: 'absolute', left: '173px', bottom: '150px'}}>
          My deck:
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            style={{display: 'flex', flexWrap: 'nowrap'}}
            spacing={3}
          >
            {playerPokemon.map((value) => (
              <Grid key={value.id} item>
                <Paper
                  className={
                    value === selectedPlayerPk ? classes.selected : classes.card
                  }
                  onClick={() => {
                    selectPokemon(value);
                  }}
                >
                  <p>{value.name}</p>
                  {/* <img src={value.sprites.front_default} /> */}
                  <img
                    style={{maxWidth: 100, maxHeight: 140}}
                    src={value.sprites.other['official-artwork'].front_default}
                  />
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
          maxWidth: '300px',
        }}
      >
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Choose your attack:
        </Grid>
        <Grid
          container
          style={{display: 'flex', justifyContent: 'center'}}
          spacing={3}
        >
          {selectedPlayerPokemon.moves.length > 0
            ? selectedPlayerPokemon.moves.map((value, i) => (
                <Grid key={i} item>
                  <Paper
                    className={
                      value === playerAttack
                        ? classes.selectedSkill
                        : classes.skill
                    }
                    onClick={() => selectMove(value)}
                  >
                    <p>{value.move.name}</p>
                  </Paper>
                </Grid>
              ))
            : [1, 2, 3, 4].map((value) => (
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
          disabled={isTurn}
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
    playerPokemon: state.pokemon.chosenPokemon,
    playerTurn: state.playerTurn.playerTurn,
    playerMoves: state.game.playerMoves,
    attackedPokemon: state.playerTurn.attackedPokemon,
    opponentPokemon: state.pokemon.opponentPokemon,
    selectedPlayerPk: state.playerTurn.selectedPlayerPokemon,
    playerAttack: state.playerTurn.playerAttack.attack,
    opponentMoves: state.game.opponentMoves,
  };
};
const mapDispatch = (dispatch) => {
  return {
    selectAttack: (pk, move) => dispatch(selectAttack(pk, move)),
    sendMoves: (moves, user) => dispatch(sendPlayerMoves(moves, user)),
    clearPlayerTurn: () => dispatch(_clearPlayerTurn()),
    clearAttackedPokemon: () => dispatch(_clearAttackedPokemon()),
    attackOpponent: (opponentPokemon, playerMoves) =>
      dispatch(attackOpponent(opponentPokemon, playerMoves)),
    selectPlayerPokemon: (pokemon) => dispatch(_selectedPlayerPokemon(pokemon)),
    setCalculatedAttacks: (turn) => dispatch(_setCalculatedAttacks(turn)),
    applyMoves: (moves, playerPk, oppPk) =>
      dispatch(applyMoves(moves, playerPk, oppPk)),
  };
};
export default connect(mapState, mapDispatch)(Actionbar);
