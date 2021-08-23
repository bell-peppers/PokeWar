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
	},
}));

const SignupPage = (props) => {
	const classes = useStyles();
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmationRef = useRef();
	const { signup, currentUser } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
		} catch {
			setError('Failed to create an account');
		}
		setLoading(false);
	}

	return (
		<div>
			<Grid className={classes.main}>
				<Grid style={{ display: 'flex', justifyContent: 'center' }}>
					POKEWARS
				</Grid>
        {currentUser && currentUser.email}
				{error && <Alert severity="error">{error}</Alert>}
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
						<TextField
							inputRef={passwordRef}
							label='Password'
							id='filled-start-adornment'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'> </InputAdornment>
								),
							}}
							variant='filled'
						/>
						<TextField
							inputRef={passwordConfirmationRef}
							label='Password confirmation'
							id='filled-start-adornment'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'> </InputAdornment>
								),
							}}
							variant='filled'
						/>
						<Button
							variant='contained'
							disabled={loading}
							style={{ width: '100px', position: 'relative', left: '125px' }}
						>
							Sign in
						</Button>
						<Grid>
							Already have an account? <a href='/login'>Log In</a>
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
	};
};
const mapDispatch = (dispatch) => {
	return {};
};
export default connect(mapState, mapDispatch)(SignupPage);
