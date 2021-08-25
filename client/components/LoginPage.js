import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useAuth } from '../../src/contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { getUserData } from '../store/userData';
import { fetchPlayerOnePokemon } from '../store/pokemon';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { OutlinedInput } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
	main: {
		fontFamily: 'Courier New, monospace',
		display: 'flex',
		backgroundColor: 'green',
		width: '100%',
		height: '600px',
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		width: '350px',
		height: '325px',
		border: '5px solid red',
		padding: '15px',
		backgroundColor: 'white',
		justifyContent: 'space-between',
	},
}));

const LoginPage = (props) => {
	const classes = useStyles();
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, currentUser, user } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { getUserData, fetchPokemon } = props;
	const [values, setValues] = React.useState({
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			//getUserData(currentUser.uid);

			history.push('/');
		} catch (error){
      console.log(error)
			setError('Failed to log in');
		}
		setLoading(false);
	}

	return (
		<div>
			<Grid className={classes.main}>
				<Grid style={{ display: 'flex', justifyContent: 'center' }}>
					<h2> Log in to your account</h2>
				</Grid>
				{error && <Alert severity='error'>{error}</Alert>}
				<Grid style={{ display: 'flex', justifyContent: 'center' }}>
					<form className={classes.form} onSubmit={handleSubmit}>
						{/* <TextField
							inputRef={usernameRef}
							label='Username'
							id='filled-start-adornment'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'> </InputAdornment>
								),
							}}
							variant='filled'
						/> */}
						<TextField
							// inputRef={el => this.emailRef = el}
							inputRef={emailRef}
							label='E-mail'
							id='filled-start-adornment'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'> </InputAdornment>
								),
							}}
							variant='filled'
						/>
						<FormControl
							className={clsx(classes.margin, classes.textField)}
							variant='outlined'
						>
							<InputLabel htmlFor='outlined-adornment-password'>
								Password
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								// type={values.showPassword ? 'text' : 'password'}
                inputRef={passwordRef}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								labelWidth={70}
							/>
						</FormControl>
						{/* <TextField
              inputRef={passwordRef}
              label='Password'
              id='filled-start-adornment'

              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>

                    <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                 </InputAdornment>
                ),
              }}
              variant='filled'
            /> */}
						<Button
							variant='contained'
							disabled={loading}
							type='submit'
							style={{ width: '100px', position: 'relative', left: '125px' }}
						>
							Log In
						</Button>
						<Grid style={{ display: 'flex', justifyContent: 'center' }}>
							Need an account? <a href='/signup'> Sign In</a>
						</Grid>
					</form>
				</Grid>
			</Grid>
		</div>
	);
};
const mapState = (state) => {
	return {
		playerPokemon: state.pokemon.playerOnePokemon,
		user: state.userData,
	};
};
const mapDispatch = (dispatch) => {
	return {
		getUserData: (uid) => dispatch(getUserData(uid)),
		fetchPokemon: (pk) => dispatch(fetchPlayerOnePokemon(pk)),
	};
};
export default connect(mapState, mapDispatch)(LoginPage);
