import React, {useState, useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {makeStyles, withStyles} from '@material-ui/core';
import {applyMoves, attackOpponent} from '../store/pokemon';
import {
  selectAttackedPokemon,
  _selectAttack,
  _selectedPlayerPokemon,
} from '../store/playerTurn';
import {getPlayerMoves} from '../store/game';
import {FIREDB} from '../../utils/firebase';
import {winCheck} from '../../utils/calculateTurn';
import {useHistory} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: 'black',
    borderRadius: '25px',
  },
  playerSide: {
    height: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    // borderTopWidth: '1px',
    // borderTopStyle: 'solid',
    // borderTopColor: 'black',
  },
  opponentSide: {
    height: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopRightRadius: '25px',
    borderTopLeftRadius: '25px',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: 'black',
  },
  playerSprites: {
    maxWidth: '100%',
    width: '200px',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    alignSelf: 'flex-start',
  },
  deadPlayerSprites: {
    maxWidth: '100%',
    width: '200px',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    alignSelf: 'flex-start',
    opacity: '25%',
  },
  opponentSprites: {
    maxWidth: '100%',
    width: '185px',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    alignSelf: 'flex-end',
  },
  opponentDeadSprites: {
    maxWidth: '100%',
    width: '185px',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    alignSelf: 'flex-end',
    opacity: '25%',
  },
  pokemonContainer: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    justifyContent: 'flex-end',
    height: '100%',
    padding: '5px',
  },

  oppPokemonContainer: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    justifyContent: 'flex-start',
    height: '100%',
    padding: '5px',
  },
  oppPokemonContainerMDown: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    justifyContent: 'flex-start',
    height: '100%',
    padding: '5px',
    backgroundColor: '#9EDEF9',
    opacity: '25%',
  },
  pokemonName: {
    alignText: 'center',
    fontSize: 20,
  },
  playerName: {
    position: 'absolute',
    display: 'flex',
    height: '50px',
    width: '250px',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: 'black',
  },
  hp: {
    fontSize: '20px',
    alignText: 'center',
  },
  nameBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: '10px',
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const Gameboard = (props) => {
  const classes = useStyles();
  const {
    resetAttack,
    selectAttacked,
    getOpponentMoves,
    applyMoves,
    selectedPlayerPk,
    playerAttack,
    resetPlayerPokemon,
    chosenPokemon,
    user,
    opponentPokemon,
    changeTurns,
    opponentName,
    isTurn,
    role,
    matchId,
    setWinner,
    winner,
  } = props;

  const history = useHistory();

  const [opponentMovesLoaded, setOpponentMovesLoaded] = useState(false);
  // const [oppMouseDown, setOppMouseDown] = useState([false, false, false]);

  const [oppMouseDown, setOppMouseDown] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 15,
      borderRadius: 5,
      width: '85%',
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      backgroundColor: 'red',
    },
  }))(LinearProgress);

  useEffect(() => {
    listenForOpponentMoves();
  }, []);

  function listenForOpponentMoves() {
    const dbUpdates = FIREDB.ref(`Match/${matchId}/moves/${opponentName}`);
    console.log(matchId, opponentName, opponentPokemon);
    dbUpdates.limitToLast(1).on('value', (snapshot) => {
      const newMoves = snapshot.val();

      if (newMoves) {
        const moves = Object.values(newMoves)[0];
        if (role === 'guest') {
          applyMoves(moves, chosenPokemon, opponentPokemon);
          checkForEndGame();
          changeTurns();
        } else if (role === 'host') {
          getOpponentMoves(moves);
          changeTurns();
        }
      }
    });
  }

  async function checkForEndGame() {
    if (winCheck(chosenPokemon, opponentPokemon)) {
      await setWinner(chosenPokemon, user, opponentName);
      history.push('/post');
      //reset pokemon - attackFeed, chosenPokemon, opponentPokemon
      //reset game - opponentInfo, playerMoves, role, availableGames, playerReady
    }
  }

  function clickHandle(pk) {
    console.log(Object.keys(playerAttack));
    if (Object.keys(playerAttack).length > 0 && selectedPlayerPk && pk.active) {
      selectAttacked(pk, playerAttack.attack, selectedPlayerPk);
      setMessage(
        `${selectedPlayerPk.name} will use ${playerAttack.attack.move.name} on ${pk.name}`
      );
      setOpen(true);
      console.log(
        `${selectedPlayerPk.name} will use ${playerAttack.attack.move.name} on ${pk.name}`
      );
      resetAttack();
      resetPlayerPokemon();
    } else {
      setMessage('Please select a move first');
      setOpen(true);
      console.log('please select a move first');
    }
  }

  // function handleMouse(e, i) {
  //   console.log(e, i);
  //   if (e.type === 'mousedown') {
  //     const arr = oppMouseDown;
  //     arr.splice(i, 1, true);
  //     console.log(arr);
  //     console.log(oppMouseDown[i]);
  //     setOppMouseDown(arr);
  //   } else {
  //     const arr = oppMouseDown;
  //     arr.splice(i, 1, false);
  //     setOppMouseDown(arr);
  //   }
  // }

  function handleMouse(e, i) {
    if (e.type === 'mousedown') {
      setOppMouseDown(i);
    } else {
      setOppMouseDown(null);
    }
  }

  return (
    <div>
      {opponentPokemon ? (
        <div className={classes.main}>
          <div className={classes.opponentSide}>
            <div className={classes.playerName}>
              {/* <h1>{opponentName}</h1> */}
            </div>
            {opponentPokemon &&
              opponentPokemon.map((pk, i) => {
                return pk.active ? (
                  <div
                    className={
                      i === oppMouseDown
                        ? classes.oppPokemonContainerMDown
                        : classes.oppPokemonContainer
                    }
                    key={pk.id}
                    onClick={() => clickHandle(pk)}
                    // onMouseDown={(e) => handleMouse(e, i)}
                    // onMouseUp={(e) => handleMouse(e, i)}
                  >
                    <div className={classes.nameBar}>
                      <p>{pk.name}</p>
                      <BorderLinearProgress
                        variant='determinate'
                        value={(pk.stats[0].base_stat / pk.stats[0].max) * 100}
                      />
                    </div>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color='inherit'>
                            {pk.owner}'s {pk.name}
                          </Typography>
                          <p>
                            <b>{'Health'}</b> -{' '}
                            {Math.floor(pk.stats[0].base_stat)} /{' '}
                            {pk.stats[0].max}
                          </p>
                          <p>
                            <b>{'Type'}</b> - {pk.types[0].type.name}{' '}
                            {pk.types[1] && pk.types[1].type.name}
                          </p>
                          {/* <b>{'Types'}</b>
                          {pk.types.map((type, i) => (
                            <p key={i}>
                              Type {i + 1} - {type.type.name}
                            </p>
                          ))} */}
                        </React.Fragment>
                      }
                    >
                      <img
                        className={classes.opponentSprites}
                        src={pk.sprites.frontGif}
                        alt={pk.name}
                        onMouseDown={(e) => handleMouse(e, i)}
                        onMouseUp={(e) => handleMouse(e, i)}
                      />
                    </HtmlTooltip>
                  </div>
                ) : (
                  <div className={classes.oppPokemonContainer}>
                    <div className={classes.nameBar}>
                      <p>{pk.name}</p>
                      <BorderLinearProgress
                        variant='determinate'
                        value={(pk.stats[0].base_stat / pk.stats[0].max) * 100}
                      />
                    </div>
                    <img
                      className={classes.opponentDeadSprites}
                      src={pk.sprites.front_default}
                      alt={pk.name}
                    />
                  </div>
                );
              })}
          </div>
          <div className={classes.playerSide}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity='info'>
                {message}
              </Alert>
            </Snackbar>
            {chosenPokemon.length > 0 &&
              chosenPokemon.map((pk) => {
                return (
                  <div className={classes.pokemonContainer} key={pk.id}>
                    {/* <div className={classes.nameBar}>
                      <p>{pk.name}</p>
                      <BorderLinearProgress
                        variant='determinate'
                        value={(pk.stats[0].base_stat / pk.stats[0].max) * 100}
                      />
                    </div> */}
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color='inherit'>
                            {pk.owner}'s {pk.name}
                          </Typography>

                          <p>
                            <b>{'Health'}</b> -{' '}
                            {Math.floor(pk.stats[0].base_stat)} /{' '}
                            {pk.stats[0].max}
                          </p>
                          <p>
                            <b>{'Type'}</b> - {pk.types[0].type.name}{' '}
                            {pk.types[1] && pk.types[1].type.name}
                          </p>
                          {/* {pk.types.map((type, i) => (
                            <p key={i}>
                              Type {i + 1} - {type.type.name}
                            </p>
                          ))} */}
                        </React.Fragment>
                      }
                    >
                      <img
                        className={
                          pk.active
                            ? classes.playerSprites
                            : classes.deadPlayerSprites
                        }
                        src={
                          pk.active
                            ? pk.sprites.backGif
                            : pk.sprites.back_default
                        }
                        // src={`https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pk.name}.gif`}
                        alt={pk.name}
                      />
                    </HtmlTooltip>
                    <div className={classes.nameBar}>
                      <p>{pk.name}</p>
                      <BorderLinearProgress
                        variant='determinate'
                        value={(pk.stats[0].base_stat / pk.stats[0].max) * 100}
                      />
                    </div>
                  </div>
                );
              })}
            <div className={classes.playerName}>
              {/* <h1>{username}</h1> */}
            </div>
          </div>
        </div>
      ) : (
        <div>please wait</div>
      )}
    </div>
  );
};
const mapState = (state) => {
  return {
    opponentMoves: state.game.opponentMoves,
    selectedPlayerPk: state.playerTurn.selectedPlayerPokemon,
    playerAttack: state.playerTurn.playerAttack,
    chosenPokemon: state.pokemon.chosenPokemon,
  };
};

const mapDispatch = (dispatch) => {
  return {
    attackOpponent: (pokemon, attack) =>
      dispatch(attackOpponent(pokemon, attack)),
    resetAttack: () => dispatch(_selectAttack({})),
    selectAttacked: (atkdpk, atk, pk) =>
      dispatch(selectAttackedPokemon(atkdpk, atk, pk)),
    getOpponentMoves: (newMoves) => dispatch(getPlayerMoves(newMoves)),
    applyMoves: (newMoves, plyrPk, oppPk) =>
      dispatch(applyMoves(newMoves, plyrPk, oppPk)),
    resetPlayerPokemon: () => dispatch(_selectedPlayerPokemon({})),
  };
};

export default connect(mapState, mapDispatch)(Gameboard);
