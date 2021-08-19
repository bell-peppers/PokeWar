import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: "Courier New, monospace",
    display: "flex",
    backgroundColor: "green",
    width: "100%",
    height: "25%",
    justifyContent: "flex-start",
  },
  root: {
    flexGrow: 1,
  },
  card: {
    height: 140,
    width: 100,
  },
  skill: {
    height: 50,
    width: 50,
  },
}));

const Actionbar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div>
        <Grid container className={classes.root} spacing={1}>
          <Grid item xs={12}>
            {/* 5, 7, 9*/}
            <Grid container spacing={3}>
              {[0, 1, 2].map((value) => (
                <Grid key={value} item>
                  <Paper className={classes.card} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {[0, 1, 2].map((value) => (
                <Grid key={value} item>
                  <Paper className={classes.skill} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
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

export default connect(mapState, mapDispatch)(Actionbar);
