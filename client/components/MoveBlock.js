import React, {useState, useEffect} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    backgroundColor: 'green',
    width: '100%',
    height: '25%',
    justifyContent: 'flex-start',
  },
  selected: {
    //backgroundColor: 'yellow',
    height: 50,
    width: 50,
  },
  skill: {
    height: 50,
    width: 50,
  },
}));

const MoveBlock = (props) => {
  const classes = useStyles();
  const {move, selectMove} = props;
  const [selected, setSelected] = useState(false);

  function selectThisMove(move) {
    selectMove(move);
    setSelected(!selected);
    console.log(move);
  }

  return (
    <Paper
      className={selected ? classes.selected : classes.skill}
      onClick={() => selectThisMove(move)}
    >
      <p>{move.move}</p>
    </Paper>
  );
};

export default MoveBlock;
