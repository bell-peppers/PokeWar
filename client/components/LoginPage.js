import React, {useState, useRef} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import {useAuth} from '../../src/contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';
import {useHistory, Link} from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {OutlinedInput} from '@material-ui/core';
import {GitHub} from '@material-ui/icons';
import Loading from './Loading';

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    height: '500px',
    marginTop: '25px',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    border: '3px solid grey',
    padding: '15px',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: '15px',
    marginBottom: '15px',
  },
  signIn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
    cursor: 'pointer',
    margin: '5px',
  },
  label: {
    marginTop: '15px',
    marginLeft: '15px',
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const {login, googleLogin, githubLogin} = useAuth();
  const [error, setError] = useState('');
  const [googleUser, setGoogleUser] = useState({});
  const [githubUser, setGithubUser] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value).then(
        () => {
          history.push('/match');
        }
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await googleLogin().then(() => {
        history.push('/match');
      });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  async function handleGithubLogin() {
    try {
      setError('');
      setLoading(true);
      await githubLogin().then(() => {
        history.push('/match');
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div style={{height: '85vh'}}>
      <Grid className={classes.main}>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <h2> SIGN IN</h2>
        </Grid>
        {error && (
          <Alert
            severity='error'
            style={{display: 'flex', justifyContent: 'center'}}
          >
            {error}
          </Alert>
        )}
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <FormControl variant='outlined'>
                <InputLabel htmlFor='login-email' className={classes.label}>
                  E-mail
                </InputLabel>
                <OutlinedInput
                  id='login-email'
                  label='e-mail'
                  inputRef={emailRef}
                  autoFocus
                />
              </FormControl>
              <FormControl variant='outlined'>
                <InputLabel htmlFor='login-password' className={classes.label}>
                  Password
                </InputLabel>
                <OutlinedInput
                  label='Password'
                  id='login-password'
                  type={values.showPassword ? 'text' : 'password'}
                  inputRef={passwordRef}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                        tabIndex='-1'
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <Button
                variant='contained'
                disabled={loading}
                color='primary'
                type='submit'
                style={{
                  width: '100px',
                  position: 'relative',
                  alignSelf: 'center',
                }}
              >
                Log In
              </Button>
              <Grid style={{display: 'flex', justifyContent: 'center'}}>
                Need an account? &nbsp; <Link to='/signup'> Sign Up</Link>
              </Grid>
            </form>
            <Button
              style={{backgroundColor: 'white'}}
              className={classes.signIn}
              onClick={() => handleGoogleLogin()}
            >
              Sign in with Google &nbsp;
              <img src='/pics/google.png' width='35px' />
            </Button>
            <Button
              className={classes.signIn}
              style={{color: 'white', backgroundColor: 'black'}}
              onClick={() => handleGithubLogin()}
            >
              Sign in with GitHub &nbsp;
              <img src='/pics/github.png' width='35px' />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
