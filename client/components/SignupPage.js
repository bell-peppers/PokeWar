import React, {useState, useEffect, useRef} from 'react';
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

const useStyles = makeStyles(() => ({
  main: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    height: '650px',
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
    borderRadius: '15px',
  },
  label: {
    marginTop: '15px',
    marginLeft: '15px',
  },
}));

export default function SignupPage() {
  const classes = useStyles();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const {signup, currentUser} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [values, setValues] = React.useState({
    showPassword: false,
    showPasswordConf: false,
  });
  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleClickShowPasswordConf = () => {
    setValues({...values, showPasswordConf: !values.showPasswordConf});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (usernameRef.current.value.match(/[.\[\]#$]/g)) {
      return setError(
        'Username contains characters that are not allowed. Please try again'
      );
    } else if (
      passwordRef.current.value !== passwordConfirmationRef.current.value
    ) {
      return setError('Passwords do not match');
    } else if (passwordRef.current.value.length < 6) {
      return setError('Passwords must be at least 6 characters in length');
    } else {
      try {
        setError('');
        setLoading(true);
        await signup(
          emailRef.current.value,
          passwordRef.current.value,
          usernameRef.current.value
        );
        setLoading(false);
        history.push('/match');
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }

    // console.log(currentUser);
  }

  return (
    <div style={{height: '85vh'}}>
      <Grid className={classes.main}>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <h2>CREATE A NEW ACCOUNT</h2>
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
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl required variant='outlined'>
              <InputLabel
                htmlFor='signup-username'
                className={classes.label}
                required
              >
                Username
              </InputLabel>
              <OutlinedInput
                label='Username'
                id='signup-username'
                inputRef={usernameRef}
                autoFocus
                //labelWidth={100}
              />
            </FormControl>

            <FormControl variant='outlined'>
              <InputLabel
                htmlFor='signup-email'
                className={classes.label}
                required
              >
                E-mail
              </InputLabel>
              <OutlinedInput
                required
                label='E-mail'
                id='signup-email'
                inputRef={emailRef}
                labelWidth={70}
              />
            </FormControl>

            <FormControl variant='outlined'>
              <InputLabel
                htmlFor='signup-password'
                className={classes.label}
                required
              >
                Password
              </InputLabel>
              <OutlinedInput
                label='Password'
                id='signup-password'
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
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <FormControl variant='outlined'>
              <InputLabel
                htmlFor='signup-password-confirmation'
                className={classes.label}
                required
              >
                Password Confirmation
              </InputLabel>
              <OutlinedInput
                label='Password confirmation'
                id='signup-password-confirmation'
                type={values.showPasswordConf ? 'text' : 'password'}
                inputRef={passwordConfirmationRef}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle passwordvisibility'
                      onClick={handleClickShowPasswordConf}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                      tabIndex='-1'
                    >
                      {values.showPasswordConf ? (
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
              color='primary'
              disabled={loading}
              type='submit'
              style={{
                width: '150px',
                position: 'relative',
                alignSelf: 'center',
              }}
            >
              Create Account
            </Button>
          </form>
        </Grid>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          Already have an account? &nbsp; <Link to='/login'>Log In</Link>
        </Grid>
      </Grid>
    </div>
  );
}
