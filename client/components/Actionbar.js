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
import {
  applyMoves,
  attackOpponent,
  applySingleMove,
  _animateOppPokemon,
  _animatePokemon,
} from '../store/pokemon';
//import MoveBlock from './MoveBlock';
import {sendPlayerMoves, getPlayerMoves} from '../store/game';
import calculateTurn from '../../utils/calculateTurn';
import {winCheck} from '../../utils/calculateTurn';
import {colorTypeGradients} from '../../utils/ColorGradientFunc';
import {useHistory} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import UIfx from 'uifx';

const selectPokeSoundFile = 'sounds/selectPoke.wav';
const errorSound = 'sounds/error.wav';

const completeTurnSound = new UIfx('sounds/completeTurn.wav', {volume: 1});
const selectPkSound = new UIfx(selectPokeSoundFile, {volume: 1});
const errSound = new UIfx(errorSound, {volume: 1});

const useStyles = makeStyles((theme) => ({
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
    width: 130,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  selectedSkill: {
    height: 50,
    width: 130,
    display: 'flex',
    justifyContent: 'space-evenly',
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
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

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
    soundOn,
    applySingleMove,
    animateOppPk,
    animatePk,
  } = props;
  const classes = useStyles();
  const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState({
    moves: [],
  });
  const [open, setOpen] = React.useState(false);
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();
  useEffect(() => {}, []);

  function selectPokemon(pokemon) {
    if (pokemon.active && !alreadyPickedCheck(pokemon)) {
      if (soundOn) {
        selectPkSound.play();
      }
      setSelectedPlayerPokemon(pokemon);
      selectPlayerPokemon(pokemon);
    } else if (!pokemon.active) {
      if (soundOn) {
        errSound.play();
      }
      setErrMessage('This Pokemon is dead');
      setOpen(true);
    }
  }

  function selectMove(move) {
    const alreadyPicked = playerTurn.filter(
      (turn) => turn.pokemon.name === selectedPlayerPokemon.name
    );
    if (alreadyPicked.length > 0) {
      errSound.play();
      setErrMessage('You have already chosen a move for this pokemon');
      setOpen(true);
    } else if (playerTurn.length === 3) {
      errSound.play();
      setErrMessage("You can't chose more than three moves!");
      setOpen(true);
    } else {
      if (soundOn) {
        selectPkSound.play();
      }
      selectAttack(selectedPlayerPokemon, move);
    }
  }
  async function checkForEndGame() {
    if (winCheck(chosenPokemon, opponentPokemon)) {
      await setWinner(chosenPokemon, user, opponentName);
      // alert(`${winner} wins!`);
      history.push('/post');
    }
  }

  async function completeTurnHandler() {
    if (playerTurn.length > 0) {
      if (role === 'guest') {
        if (soundOn) {
          completeTurnSound.play();
        }
        sendMoves(playerTurn, user.username, matchId);
      } else if (role === 'host') {
        //make sure we have moves
        if (opponentMoves) {
          if (soundOn) {
            completeTurnSound.play();
          }
          const thisTurn = calculateTurn(playerTurn, opponentMoves);
          setCalculatedAttacks(thisTurn);
          await sendMoves(thisTurn, user.username, matchId);
          //apply
          thisTurn.map((move, index) => {
            setTimeout(() => {
              applySingleMove(
                move,
                chosenPokemon,
                opponentPokemon,
                user.username,
                soundOn
              );

              if (index === thisTurn.length - 1) {
                // animatePk(null);
                // animateOppPk(null);
                checkForEndGame();
              }
            }, 2000 * index);
          });
        }
      }
      changeTurns();
      clearPlayerTurn();
      clearAttackedPokemon();
      selectPlayerPokemon({});
      clearOpponentMoves();
    } else {
      errSound.play();
      setErrMessage('You should probably choose an attack first');
      setOpen(true);
    }
  }

  function alreadyPickedCheck(pk) {
    let check = playerTurn.filter((move) => {
      return move.pokemon.name === pk.name;
    });

    return check.length > 0 ? true : false;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.actionBar}>
      {isTurn ? (
        <h3 style={{textAlign: 'center'}}>Your turn - Choose your moves!</h3>
      ) : (
        <h3 style={{textAlign: 'center'}}>
          Please wait for {opponentName} to complete their turn before
          submitting your moves
        </h3>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error'>
          {errMessage}
        </Alert>
      </Snackbar>
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
              marginBottom: '15px',
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
              ? selectedPlayerPokemon.moves.map((value, i) => {
                  let finalColor;

                  finalColor = colorTypeGradients(
                    value.moveData.type.name,
                    value.moveData.type.name,
                    1
                  );

                  return (
                    <Button key={i}>
                      <Paper
                        className={
                          value === playerAttack
                            ? classes.selectedSkill
                            : classes.skill
                        }
                        style={{
                          background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
                        }}
                        onClick={() => selectMove(value)}
                      >
                        <img
                          style={{width: '18px', height: '18px'}}
                          src={`assets/${value.moveData.type.name}.png`}
                        />
                        <p>{value.move.name}</p>
                      </Paper>
                    </Button>
                  );
                })
              : [1, 2, 3, 4].map((value) => (
                  <Grid key={value} item>
                    <Paper className={classes.skill}>
                      <p></p>
                    </Paper>
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxHeight: '170px',
          width: '33%',
          marginTop: '15px',
        }}
      >
        <Button
          variant='contained'
          color='secondary'
          disabled={!isTurn}
          onClick={() => completeTurnHandler()}
        >
          Complete turn
        </Button>
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
    applySingleMove: (move, playerPk, oppPk, username, soundOn) =>
      dispatch(applySingleMove(move, playerPk, oppPk, username, soundOn)),
    animateOppPk: (index) => dispatch(_animateOppPokemon(index)),
    animatePk: (index) => dispatch(_animatePokemon(index)),
  };
};
export default connect(mapState, mapDispatch)(Actionbar);
