import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import Gameboard from "./Gameboard";
import Actionbar from "./Actionbar";
import Sidebar from "./Sidebar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: "Courier New, monospace",
    display: "flex",
    backgroundColor: "red",
    width: "100vw",
    height: "100%",
    justifyContent: "space-between",
  },
  board: {
    fontFamily: "Courier New, monospace",
    display: "flex",
    backgroundColor: "red",
    width: "100vw",
    height: "100%",
    justifyContent: "space-between",
  },
}));

//<Grid className={classes.main}>
const Main = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.main}>
        <Typography
          component="div"
          style={{backgroundColor: "#cfe8fc", height: "100vh"}}
        />

        <h1>Heading</h1>
        <div className={classes.board}>
          <Gameboard />
          <Actionbar />
        </div>
        <div>
          <Sidebar />
        </div>
      </Container>
    </React.Fragment>
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

export default connect(mapState, mapDispatch)(Main);
