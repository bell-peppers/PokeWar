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

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
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
    username,
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
  const [oppMouseDown, setOppMouseDown] = useState([false, false, false]);

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
    console.log(opponentPokemon);

    listenForOpponentMoves();
  }, []);

  function listenForOpponentMoves() {
    console.log(opponentPokemon);

    // const match = 'Match1';
    // const opponent = 'player2';
    //firebase looking for updates to this match
    console.log(isTurn);
    const dbUpdates = FIREDB.ref(`Match/${matchId}/moves/${opponentName}`);
    console.log(matchId, opponentName, opponentPokemon);
    dbUpdates.limitToLast(1).on('value', (snapshot) => {
      console.log(snapshot);
      const newMoves = snapshot.val();
      console.log(newMoves);
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

        //setOpponentMovesLoaded(true)
      }
    });
  }

  function checkForEndGame() {
    if (winCheck(chosenPokemon, opponentPokemon)) {
      setWinner(chosenPokemon, username, opponentName);
      // alert(`${winner} wins!`);
      // history.push('/post');
      //endmatch
      //push to new component
      //delete match from server
      //add win/loss stats
    }
  }

  function clickHandle(pk) {
    if (playerAttack && selectedPlayerPk && pk.active) {
      selectAttacked(pk, playerAttack.attack, selectedPlayerPk);
      console.log(
        `${selectedPlayerPk.name} will use ${playerAttack.attack.move.name} on ${pk.name}`
      );
      resetAttack();
      resetPlayerPokemon();
    }
  }

  function handleMouse(e, i) {
    console.log(e, i);
    if (e.type === 'mousedown') {
      const arr = oppMouseDown;
      arr.splice(i, 1, true);
      console.log(arr);
      console.log(oppMouseDown[i]);
      setOppMouseDown(arr);
    } else {
      const arr = oppMouseDown;
      arr.splice(i, 1, false);
      setOppMouseDown(arr);
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
                      oppMouseDown[i] === true
                        ? classes.oppPokemonContainerMDown
                        : classes.oppPokemonContainer
                    }
                    key={pk.id}
                    onClick={() => clickHandle(pk)}
                    onMouseDown={(e) => handleMouse(e, i)}
                    onMouseUp={(e) => handleMouse(e, i)}
                  >
                    <div className={classes.nameBar}>
                      <p>{pk.name}</p>
                      <BorderLinearProgress
                        variant='determinate'
                        value={(pk.stats[0].base_stat / pk.stats[0].max) * 100}
                      />
                    </div>
                    <img
                      className={classes.opponentSprites}
                      src={pk.sprites.frontGif}
                      alt={pk.name}
                    />
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
            {chosenPokemon.length > 0 &&
              chosenPokemon.map((pk) => {
                return (
                  <div className={classes.pokemonContainer} key={pk.id}>
                    <img
                      className={
                        pk.active
                          ? classes.playerSprites
                          : classes.deadPlayerSprites
                      }
                      src={
                        pk.active ? pk.sprites.backGif : pk.sprites.back_default
                      }
                      // src={`https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pk.name}.gif`}
                      alt={pk.name}
                    />

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
