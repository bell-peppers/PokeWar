import React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles, withStyles} from '@material-ui/core';

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
    },}))

export default function PostGame(props) {
  const classes = useStyles();
  const {winner,user,opponentName} = props
  const history = useHistory();

  return <div>
    {winner === user.username ? ():()}
  </div>;
}
