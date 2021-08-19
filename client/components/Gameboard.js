import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: "Courier New, monospace",
    display: "flex",
    backgroundColor: "yellow",
    width: "100%",
    height: "75%",
    justifyContent: "flex-end",
  },
}));

const Gameboard = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div id="playerOnePokemon">
        <h1>Player One</h1>
      </div>
      <div id="playerTwoPokemon">
        <h1>Player Two</h1>
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Gameboard);
