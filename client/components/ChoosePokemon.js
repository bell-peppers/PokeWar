import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import Card from '@material-ui/core/Card';
import {CardContent, Typography, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {colorTypeGradients} from '../../utils/ColorGradientFunc';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Modal from '@material-ui/core/Modal';
import {useHistory} from 'react-router-dom';
import {
  choosePlayerPokemon,
  unchoosePlayerPokemon,
  sendChosenPokemon,
  fetchOpponentPokemon,
} from '../store/pokemon';
import {setPlayerReady, setWinner} from '../store/game';
import {startBattleMusic} from '../store/userData';
import {FIREDB} from '../../utils/firebase';
import {_changeTurns} from '../store/playerTurn';
import LinearProgress from '@material-ui/core/LinearProgress';
import UIfx from 'uifx';

const selectSoundFile = 'sounds/select.wav';
const readySoundFile = 'sounds/menu-select.mp3';

const selectSound = new UIfx(selectSoundFile, {volume: 1});
const readySound = new UIfx(readySoundFile, {volume: 1});

const useStyles = makeStyles((theme) => ({
  PokeCards: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '200px',
    margin: '10px',
  },
  picked: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '200px',
    margin: '10px',
    boxShadow: '1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',
  },
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '85vh',
    maxWidth: '1200px',
    minWidth: '400px',
    minheight: '400px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',

    maxWidth: '1400px',
    minWidth: '400px',
    minheight: '400px',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}));

function ChoosePokemon(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedPokemon, setSelectedPokemon] = React.useState({});
  const [pokeColor, setPokeColor] = React.useState([]);
  const [readyClicked, setReadyClicked] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const {
    playerPokemon,
    choosePokemon,
    chosenPokemon,
    unchoosePokemon,
    matchId,
    role,
    sendChosenPokemon,
    fetchOpponentPokemon,
    setReady,
    changeTurns,
    user,
    opponentName,
    setWinner,
    soundOn,
    startMusic,
    musicOn,
  } = props;

  const handleOpen = (pokemon, color) => {
    setOpen(true);
    setSelectedPokemon(pokemon);
    setPokeColor(color);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPokemon({});
    setPokeColor([]);
  };

  const clickHandle = (pk) => {
    if (!readyClicked) {
      if (chosenPokemon.length < 3 && !alreadyPicked(pk)) {
        if (soundOn) {
          selectSound.play();
        }
        choosePokemon(pk);
      } else {
        unchoosePokemon(pk);
      }
    }
  };

  const listenOppReady = () => {
    const readyUpdate = FIREDB.ref(`Match/${matchId}/ready`);
    readyUpdate.on('value', async (snapshot) => {
      const readyCheck = snapshot.val();

      if (role === 'host') {
        if (readyCheck.guestReady === true && readyCheck.hostReady === true) {
          fetchOpponentPokemon(matchId, role);
          if (musicOn) {
            startMusic('sounds/trainerBattle.mp3');
          }
          history.push('/game');
        } else if (readyCheck.guestReady === false) {
          alert('Other player has quit the game!');
          await setWinner([{active: true}], user, opponentName);
          history.push('/post');
        }
      } else if (role === 'guest') {
        if (readyCheck.hostReady === true && readyCheck.guestReady === true) {
          await fetchOpponentPokemon(matchId, role);
          if (musicOn) {
            startMusic('sounds/trainerBattle.mp3');
          }
          history.push('/game');
        } else if (readyCheck.hostReady === false) {
          alert('Other player has quit the game!');
          await setWinner([{active: true}], user, opponentName);
          history.push('/post');
        }
      }
    });
  };

  const readyButtonHandle = () => {
    if (soundOn) {
      readySound.play();
    }
    setReadyClicked(true);
    if (role === 'guest') {
      changeTurns();
    }
    sendChosenPokemon(chosenPokemon, matchId, role);
    setReady(matchId, role, true);
    listenOppReady();
  };

  const alreadyPicked = (pk) => {
    const alreadyPick = chosenPokemon.filter((pkm) => {
      return pkm.name === pk.name;
    });

    return alreadyPick.length > 0 ? true : false;
  };

  return (
    <div className={classes.main}>
      <div>
        {readyClicked ? (
          <div style={{marginTop: 50, marginBottom: 40}}>
            <h2>Waiting for other player to finish choosing...</h2>
            <LinearProgress color='secondary' />
          </div>
        ) : (
          <div
            className={classes.buttonContainer}
            style={{marginTop: 50, marginBottom: 40}}
          >
            <h1>Choose your three pokemon to take to battle!</h1>{' '}
            <Button
              onClick={() => readyButtonHandle()}
              variant='contained'
              color='primary'
              disabled={chosenPokemon.length < 3}
            >
              READY!
            </Button>
          </div>
        )}
      </div>
      {readyClicked ? (
        <div className={classes.cardContainer}>
          {playerPokemon[0] &&
            chosenPokemon.map((poke) => {
              let finalColor;

              if (poke.types.length === 2) {
                finalColor = colorTypeGradients(
                  poke.types[0].type.name,
                  poke.types[1].type.name,
                  poke.types.length
                );
              } else {
                finalColor = colorTypeGradients(
                  poke.types[0].type.name,
                  poke.types[0].type.name,
                  poke.types.length
                );
              }

              return (
                <React.Fragment key={poke.id}>
                  <Card
                    className={
                      alreadyPicked(poke) ? classes.picked : classes.PokeCards
                    }
                    key={poke.id}
                    style={{
                      background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
                    }}
                    onClick={() => clickHandle(poke)}
                  >
                    <CardContent>
                      <Typography
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        #{poke.id}{' '}
                        <InfoOutlinedIcon
                          onClick={() => handleOpen(poke, finalColor)}
                          style={{
                            cursor: 'pointer',
                          }}
                        />
                      </Typography>
                      <Typography>
                        <img
                          className='cardPic'
                          src={
                            poke.sprites.other['official-artwork'].front_default
                          }
                        />
                      </Typography>
                      <Typography className='data'>{poke.name}</Typography>
                      {poke.types.length === 2 ? (
                        <Typography
                          style={{
                            display: 'flex',
                            width: '100px',
                            height: '20px',
                            marginTop: '4px',
                            marginLeft: '20%',
                            justifyContent: 'space-evenly',
                          }}
                        >
                          <img src={`assets/${poke.types[0].type.name}.png`} />
                          <img src={`assets/${poke.types[1].type.name}.png`} />
                        </Typography>
                      ) : (
                        <Typography
                          style={{
                            display: 'flex',
                            width: '20px',
                            height: '20px',
                            marginTop: '4px',
                            marginLeft: '45%',
                          }}
                        >
                          <img src={`assets/${poke.types[0].type.name}.png`} />
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </React.Fragment>
              );
            })}
        </div>
      ) : (
        <div className={classes.cardContainer}>
          {playerPokemon[0] &&
            playerPokemon
              .sort((a, b) => {
                return a.id - b.id;
              })
              .map((poke) => {
                let finalColor;

                if (poke.types.length === 2) {
                  finalColor = colorTypeGradients(
                    poke.types[0].type.name,
                    poke.types[1].type.name,
                    poke.types.length
                  );
                } else {
                  finalColor = colorTypeGradients(
                    poke.types[0].type.name,
                    poke.types[0].type.name,
                    poke.types.length
                  );
                }

                return (
                  <React.Fragment key={poke.id}>
                    <Card
                      className={
                        alreadyPicked(poke) ? classes.picked : classes.PokeCards
                      }
                      key={poke.id}
                      style={{
                        background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
                      }}
                      onClick={() => clickHandle(poke)}
                    >
                      <CardContent>
                        <Typography
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          #{poke.id}{' '}
                          <InfoOutlinedIcon
                            onClick={() => handleOpen(poke, finalColor)}
                            style={{
                              cursor: 'pointer',
                            }}
                          />
                        </Typography>
                        <Typography>
                          <img
                            className='cardPic'
                            src={
                              poke.sprites.other['official-artwork']
                                .front_default
                            }
                          />
                        </Typography>
                        <Typography className='data'>{poke.name}</Typography>
                        {poke.types.length === 2 ? (
                          <Typography
                            style={{
                              display: 'flex',
                              width: '100px',
                              height: '20px',
                              marginTop: '4px',
                              marginLeft: '20%',
                              justifyContent: 'space-evenly',
                            }}
                          >
                            <img
                              src={`assets/${poke.types[0].type.name}.png`}
                            />
                            <img
                              src={`assets/${poke.types[1].type.name}.png`}
                            />
                          </Typography>
                        ) : (
                          <Typography
                            style={{
                              display: 'flex',
                              width: '20px',
                              height: '20px',
                              marginTop: '4px',
                              marginLeft: '45%',
                            }}
                          >
                            <img
                              src={`assets/${poke.types[0].type.name}.png`}
                            />
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </React.Fragment>
                );
              })}
        </div>
      )}
      {selectedPokemon.id && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          <div
            style={{
              background: `linear-gradient(${pokeColor[0]}, ${pokeColor[1]})`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              outline: 0,
            }}
            className={classes.paper}
          >
            <h2 style={{textAlign: 'center'}}>{selectedPokemon.name}</h2>
            <h3 style={{marginLeft: '2rem'}}>Abilities:</h3>
            <ul style={{display: 'inline-block', listStyle: 'none'}}>
              <li>{selectedPokemon.moves[0].move.name}</li>
              <li>{selectedPokemon.moves[1].move.name}</li>
            </ul>
            <ul style={{display: 'inline-block', listStyle: 'none'}}>
              <li>{selectedPokemon.moves[2].move.name}</li>
              <li>{selectedPokemon.moves[3].move.name}</li>
            </ul>
            <h3 style={{marginLeft: '2rem'}}>Base Stats:</h3>
            <ul style={{display: 'inline-block', listStyle: 'none'}}>
              <li>HP {selectedPokemon.stats[0].base_stat}</li>
              <li>ATK {selectedPokemon.stats[1].base_stat}</li>
            </ul>
            <ul style={{display: 'inline-block', listStyle: 'none'}}>
              <li>DEF {selectedPokemon.stats[2].base_stat}</li>
              <li>SP ATK {selectedPokemon.stats[3].base_stat}</li>
            </ul>
            <ul style={{display: 'inline-block', listStyle: 'none'}}>
              <li>SP DEF {selectedPokemon.stats[4].base_stat}</li>
              <li>SPD {selectedPokemon.stats[5].base_stat}</li>
            </ul>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {selectedPokemon.types ? (
                selectedPokemon.types.length === 2 ? (
                  <div
                    style={{
                      display: 'flex',
                      width: '100px',
                      height: '20px',
                      margin: '6px',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <img
                      src={`assets/${selectedPokemon.types[0].type.name}.png`}
                    />
                    <img
                      src={`assets/${selectedPokemon.types[1].type.name}.png`}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      width: '20px',
                      height: '20px',
                      margin: '6px',
                    }}
                  >
                    <img
                      src={`assets/${selectedPokemon.types[0].type.name}.png`}
                    />
                  </div>
                )
              ) : null}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

const mapState = (state) => {
  return {
    playerPokemon: state.pokemon.playerOnePokemon,
    user: state.userData.user,
    opponentName: state.game.opponentInfo.username,
    chosenPokemon: state.pokemon.chosenPokemon,
    role: state.game.role,
    playerReady: state.game.playerReady,
    soundOn: state.userData.soundOn,
    musicOn: state.userData.musicOn,
  };
};
const mapDispatch = (dispatch) => {
  return {
    choosePokemon: (pk) => dispatch(choosePlayerPokemon(pk)),
    unchoosePokemon: (pk) => dispatch(unchoosePlayerPokemon(pk)),
    sendChosenPokemon: (pk, matchId, role) =>
      dispatch(sendChosenPokemon(pk, matchId, role)),
    setReady: (mid, role, ready) => dispatch(setPlayerReady(mid, role, ready)),
    changeTurns: () => dispatch(_changeTurns()),
    fetchOpponentPokemon: (matchId, role) =>
      dispatch(fetchOpponentPokemon(matchId, role)),
    setWinner: (pk, user, opp) => dispatch(setWinner(pk, user, opp)),
    startMusic: (src) => dispatch(startBattleMusic(src)),
  };
};
export default connect(mapState, mapDispatch)(ChoosePokemon);
