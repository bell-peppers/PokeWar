import React, {useState, useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {makeStyles, withStyles} from '@material-ui/core';
import {
  _animateOppPokemon,
  _animatePokemon,
  incomingAttack,
  applySingleMove,
} from '../../store/pokemon';
import {
  selectAttackedPokemon,
  _selectAttack,
  _selectedPlayerPokemon,
} from '../../store/playerTurn';
import {getPlayerMoves} from '../../store/game';
import {winCheck} from '../../../utils/calculateTurn';
import {useHistory} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import UIfx from 'uifx';
import {Animate} from 'react-simple-animate';
import {Translate} from '@material-ui/icons';

const selectOppPokeSoundFile = 'sounds/selectOppPoke.wav';

const selectOppSound = new UIfx(selectOppPokeSoundFile, {volume: 1});

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
    //height: '100%',
    justifyContent: 'flex-end',
    borderTopLeftRadius: '25px',
    borderBottomLeftRadius: '25px',
    backgroundImage: 'url("pics/fieldbk.png")',
    backgroundSize: 'cover',
  },
  playerSide: {
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottomLeftRadius: '25px',
    fontWeight: 'bold',
  },
  opponentSide: {
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    //borderTopRightRadius: '25px',
    borderTopLeftRadius: '25px',
    color: 'white',
    fontWeight: 'bold',
  },
  playerSprites: {
    maxWidth: '100%',
    width: '180px',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    alignSelf: 'flex-start',
    imageRendering: 'pixelated',
  },
  deadPlayerSprites: {
    maxWidth: '100%',
    width: '180px',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    alignSelf: 'flex-start',
    opacity: '25%',
  },
  opponentSprites: {
    maxWidth: '100%',
    width: '155px',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
    alignSelf: 'flex-end',
  },
  opponentDeadSprites: {
    maxWidth: '100%',
    width: '155px',
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
    //width: '30%',
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
    selectedPlayerPk,
    playerAttack,
    resetPlayerPokemon,
    chosenPokemon,
    opponentPokemon,
    soundOn,
    pkAnim,
    oppAnim,
    animateOppPk,
    animatePk,

    incomingAtk,
  } = props;

  const history = useHistory();

  const [oppMouseDown, setOppMouseDown] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');

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

  function completeAnimation() {
    animatePk(null);
    animateOppPk(null);
  }

  function clickHandle(pk) {
    animatePk();

    if (Object.keys(playerAttack).length > 0 && selectedPlayerPk && pk.active) {
      if (soundOn) {
        selectOppSound.play();
      }
      selectAttacked(pk, playerAttack.attack, selectedPlayerPk);
      setMessage(
        `${selectedPlayerPk.name} will use ${playerAttack.attack.move.name} on ${pk.name}`
      );
      setOpen(true);
      resetAttack();
      resetPlayerPokemon();
    } else {
      setMessage('Please select a move first');
      setOpen(true);
    }
  }

  function handleMouse(e, i) {
    if (e.type === 'mousedown') {
      setOppMouseDown(i);
    } else {
      setOppMouseDown(null);
    }
  }

  return (
    <React.Fragment>
      {opponentPokemon ? (
        <div className={classes.main}>
          <div className={classes.opponentSide}>
            {opponentPokemon &&
              opponentPokemon.map((pk, i) => {
                return pk.active ? (
                  <div
                    className={
                      i === oppMouseDown
                        ? classes.oppPokemonContainerMDown
                        : classes.oppPokemonContainer
                    }
                    key={pk.id ? pk.id : i}
                    onClick={() => clickHandle(pk)}
                  >
                    <div className={classes.nameBar}>
                      <p style={{margin: 0}}>{pk.name}</p>
                      <BorderLinearProgress
                        variant='determinate'
                        value={(pk.stats[0].base_stat / pk.stats[0].max) * 100}
                      />
                    </div>
                    <Animate
                      play={i === oppAnim}
                      start={
                        incomingAtk
                          ? {transform: 'translate(0px,0px) scale(1)'}
                          : {transform: 'scale(1)'}
                      }
                      end={
                        incomingAtk
                          ? {
                              transform: `translate(${
                                pkAnim - i * 100
                              }px,100px) scale(1.5)`,
                            }
                          : {transform: 'scale(0.75)', backgroundColor: 'red'}
                      }
                      complete={
                        incomingAtk
                          ? {transform: 'translate(0px,0px) scale(1)'}
                          : {transform: 'scale(1)'}
                      }
                      duration={0.2}
                      onComplete={completeAnimation}
                    >
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
                    </Animate>
                  </div>
                ) : (
                  <div className={classes.oppPokemonContainer}>
                    <div className={classes.nameBar}>
                      <p style={{margin: 0}}>{pk.name}</p>
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
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
              <Alert onClose={handleClose} severity='info'>
                {message}
              </Alert>
            </Snackbar>
            {chosenPokemon.length > 0 &&
              chosenPokemon.map((pk, i) => {
                return (
                  <div className={classes.pokemonContainer} key={pk.id}>
                    <Animate
                      play={i === pkAnim}
                      start={
                        incomingAtk
                          ? {transform: 'scale(1)'}
                          : {transform: 'translate(0px,0px) scale(1)'}
                      }
                      end={
                        incomingAtk
                          ? {transform: 'scale(0.75)', backgroundColor: 'red'}
                          : {
                              transform: `translate(${
                                oppAnim - i * 100
                              }px,-100px) scale(1.5)`,
                            }
                      }
                      complete={
                        incomingAtk
                          ? {transform: 'scale(1)'}
                          : {transform: 'translate(0px,0px) scale(1)'}
                      }
                      duration={0.2}
                      onComplete={completeAnimation}
                    >
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
                          alt={pk.name}
                        />
                      </HtmlTooltip>
                    </Animate>
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
          </div>
        </div>
      ) : (
        <div>please wait</div>
      )}
    </React.Fragment>
  );
};

const mapState = (state) => {
  return {
    opponentMoves: state.game.opponentMoves,
    selectedPlayerPk: state.playerTurn.selectedPlayerPokemon,
    playerAttack: state.playerTurn.playerAttack,
    chosenPokemon: state.pokemon.chosenPokemon,
    pkAnim: state.pokemon.pkAnim,
    oppAnim: state.pokemon.oppAnim,
    incomingAtk: state.pokemon.incomingAtk,
  };
};

const mapDispatch = (dispatch) => {
  return {
    resetAttack: () => dispatch(_selectAttack({})),
    selectAttacked: (atkdpk, atk, pk) =>
      dispatch(selectAttackedPokemon(atkdpk, atk, pk)),
    getOpponentMoves: (newMoves) => dispatch(getPlayerMoves(newMoves)),
    resetPlayerPokemon: () => dispatch(_selectedPlayerPokemon({})),
    animateOppPk: (index) => dispatch(_animateOppPokemon(index)),
    animatePk: (index) => dispatch(_animatePokemon(index)),
    incomingAttack: () => dispatch(incomingAttack()),
    applySingleMove: (move, playerPk, oppPk, username, soundOn) =>
      dispatch(applySingleMove(move, playerPk, oppPk, username, soundOn)),
  };
};

export default connect(mapState, mapDispatch)(Gameboard);
