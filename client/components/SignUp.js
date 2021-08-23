import React, {useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {useAuth} from '../../utils/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 500,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function SignUp() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const {signup} = useAuth();
  const classes = useStyles();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    console.log(useAuth);

    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.error(error);
      setError('Failed to create an account');
    }
    setLoading(false);
  }
  return (
    <div>
      <Card className={classes.root}>
        {error && alert(error)}
        <CardContent>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={classes.form}
            noValidate
            autoComplete='off'
          >
            <TextField id='email' required inputRef={emailRef} label='Email' />
            <TextField id='username' inputRef={usernameRef} label='Username' />
            <TextField
              id='password'
              required
              inputRef={passwordRef}
              label='Password'
            />
            <TextField
              id='password-confirm'
              required
              inputRef={passwordConfirmRef}
              label='Password Confirmation'
            />{' '}
            <Button disabled={loading} type='submit'>
              Sign up
            </Button>
          </form>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}
