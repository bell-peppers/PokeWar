import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import pokemon from './pokemon';
import game from './game';
import playerTurn from './playerTurn';
import allPokemon from './allPokemon';
import userData from './userData';
import legendaries from './pokeStore';

const reducer = combineReducers({
  allPokemon,
  pokemon,
  game,
  playerTurn,
  userData,
  legendaries,
});

// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// );

//for deploy
const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;
