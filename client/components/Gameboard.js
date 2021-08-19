import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

const Gameboard = (props) => {
  return (
    <div style={{display: "flex"}}>
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
