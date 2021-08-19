import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: "Courier New, monospace",
    display: "flex",
    backgroundColor: "blue",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <h1>sidebar</h1>
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

export default connect(mapState, mapDispatch)(Sidebar);
