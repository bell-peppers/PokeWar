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
import {sendPlayerMoves, getPlayerMoves} from '../store/game';
import calculateTurn from '../../utils/calculateTurn';
import {winCheck} from '../../utils/calculateTurn';
import {colorTypeGradients} from '../../utils/ColorGradientFunc';

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    //backgroundColor: 'green',
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
    fontWeight: 'bold',
  },
  skill: {
    height: 50,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  selectedSkill: {
    height: 50,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    boxShadow: '1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',
  },
  actionBar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  subActionBar: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  selected: {
    height: 140,
    width: 100,
    fontWeight: 'bold',
    boxShadow: '1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',
  },
  picked: {
    opacity: '30%',
  },
}));
const Actionbar = (props) => {
  const {
    playerPokemon,
    selectAttack,
    playerTurn,
    sendMoves,
    clearPlayerTurn,
    clearAttackedPokemon,
    opponentPokemon,
    selectedPlayerPk,
    selectPlayerPokemon,
    playerAttack,
    isTurn,
    changeTurns,
    role,
    user,
    opponentMoves,
    setCalculatedAttacks,
    applyMoves,
    clearOpponentMoves,
    matchId,
    setWinner,
    opponentName,
    winner,
    chosenPokemon,
  } = props;
  const classes = useStyles();
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState({
    moves: [],
  });

  useEffect(() => {}, []);

  function selectPokemon(pokemon) {
    console.log(pokemon);
    if (pokemon.active) {
      setSelectedPlayerPokemon(pokemon);
      selectPlayerPokemon(pokemon);
    } else {
      alert('this guy is dead');
    }
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
  function checkForEndGame() {
    if (winCheck(chosenPokemon, opponentPokemon)) {
      setWinner(chosenPokemon, user, opponentName);
      // alert(`${winner} wins!`);
      history.push('/post');
      //endmatch
      //push to new component
      //delete match from server
      //add win/loss stats
    }
  }

  async function completeTurnHandler() {
    // const user = 'player1';
    // const sendMove = playerTurn.map((move, index) => {
    //   return {...move, attackedPokemon: attackedPokemon[index]};
    // });
    if (role === 'guest') {
      console.log(user);
      sendMoves(playerTurn, user.username, matchId);
    } else if (role === 'host') {
      //make sure we have moves
      if (opponentMoves) {
        const thisTurn = calculateTurn(playerTurn, opponentMoves);
        setCalculatedAttacks(thisTurn);

        await sendMoves(thisTurn, user.username, matchId);
        //apply
        applyMoves(thisTurn, playerPokemon, opponentPokemon);
        checkForEndGame();
      }

      //apply to opppk
      //turn over
    }
    changeTurns();
    clearPlayerTurn();
    clearAttackedPokemon();
    selectPlayerPokemon({});
    clearOpponentMoves();
  }

  function alreadyPickedCheck(pk) {
    let check = playerTurn.filter((move) => {
      return move.pokemon.name === pk.name;
    });

    return check.length > 0 ? true : false;
  }

  return (
    <div className={classes.actionBar}>
      {isTurn ? (
        <h2 style={{textAlign: 'center'}}>Your turn - Choose your moves!</h2>
      ) : (
        <h2 style={{textAlign: 'center'}}>Please wait for your turn</h2>
      )}
      <div className={classes.subActionBar}>
        <Grid container className={classes.root} spacing={1}>
          {/* <Grid style={{position: 'absolute', left: '173px', bottom: '150px'}}>
            My deck:
          </Grid> */}
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            Choose a Pokemon:
            <Grid
              container
              style={{display: 'flex', flexWrap: 'nowrap'}}
              spacing={3}
            >
              {playerPokemon.map((value) => {
                let finalColor;

                if (value.types.length === 2) {
                  finalColor = colorTypeGradients(
                    value.types[0].type.name,
                    value.types[1].type.name,
                    value.types.length
                  );
                } else {
                  finalColor = colorTypeGradients(
                    value.types[0].type.name,
                    value.types[0].type.name,
                    value.types.length
                  );
                }
                return (
                  <Grid key={value.id} item>
                    <Paper
                      className={
                        value === selectedPlayerPk
                          ? classes.selected
                          : classes.card
                      }
                      style={
                        alreadyPickedCheck(value)
                          ? {opacity: '50%'}
                          : {
                              background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
                            }
                      }
                      onClick={() => {
                        selectPokemon(value);
                      }}
                    >
                      <p style={{textAlign: 'center'}}>{value.name}</p>
                      {/* <img src={value.sprites.front_default} /> */}
                      <img
                        className={
                          alreadyPickedCheck(value) || !value.active
                            ? classes.picked
                            : null
                        }
                        style={{maxWidth: 100, maxHeight: 140}}
                        src={
                          value.active
                            ? value.sprites.other['official-artwork']
                                .front_default
                            : value.sprites.back_default
                        }
                      />
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            // border: '5px solid red',
            maxWidth: '300px',
            justifyContent: 'center',
          }}
        >
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            Choose your attack:
          </Grid>
          <Grid
            container
            style={{display: 'flex', justifyContent: 'center'}}
            spacing={2}
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
            // style={{
            //   height: '45px',
            // }}
            variant='contained'
            color='secondary'
            disabled={!isTurn}
            onClick={() => completeTurnHandler()}
          >
            Complete turn
          </Button>
        </Grid>
      </div>
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
    chosenPokemon: state.pokemon.chosenPokemon,
  };
};
const mapDispatch = (dispatch) => {
  return {
    selectAttack: (pk, move) => dispatch(selectAttack(pk, move)),
    sendMoves: (moves, user, matchId) =>
      dispatch(sendPlayerMoves(moves, user, matchId)),
    clearPlayerTurn: () => dispatch(_clearPlayerTurn()),
    clearAttackedPokemon: () => dispatch(_clearAttackedPokemon()),
    attackOpponent: (opponentPokemon, playerMoves) =>
      dispatch(attackOpponent(opponentPokemon, playerMoves)),
    selectPlayerPokemon: (pokemon) => dispatch(_selectedPlayerPokemon(pokemon)),
    setCalculatedAttacks: (turn) => dispatch(_setCalculatedAttacks(turn)),
    applyMoves: (moves, playerPk, oppPk) =>
      dispatch(applyMoves(moves, playerPk, oppPk)),
    clearOpponentMoves: () => dispatch(getPlayerMoves([])),
  };
};
export default connect(mapState, mapDispatch)(Actionbar);
