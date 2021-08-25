import React, { useState, useEffect, useRef } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useAuth } from '../../src/contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { OutlinedInput } from '@material-ui/core';

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
		border: '5px solid grey',
		padding: '15px',
		backgroundColor: 'white',
	},
}));

export default function SignupPage() {
	const classes = useStyles();
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmationRef = useRef();
	const { signup, currentUser } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const [values, setValues] = React.useState({
		showPassword: false,
	});
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				usernameRef.current.value
			);

			history.push('/');
		} catch (error) {
			console.log(error);
			setError('Failed to create an account');
		}
		console.log(currentUser);
		setLoading(false);
	}

	return (
		<div>
			<Grid className={classes.main}>
				<Grid style={{ display: 'flex', justifyContent: 'center' }}>
					<h2>CREATE YOUR ACCOUNT</h2>
				</Grid>
				{error && <Alert severity='error'>{error}</Alert>}
				<Grid style={{ display: 'flex', justifyContent: 'center' }}>
					<form className={classes.form} onSubmit={handleSubmit}>
						<FormControl variant='outlined'>
							<InputLabel htmlFor='signup-username'>E-mail</InputLabel>
							<OutlinedInput
								label='Username'
								id='signup-username'
								inputRef={usernameRef}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl variant='outlined'>
							<InputLabel htmlFor='signup-email'>E-mail</InputLabel>
							<OutlinedInput
								label='E-mail'
								id='signup-email'
								inputRef={emailRef}
								labelWidth={70}
							/>
						</FormControl>

						<FormControl variant='outlined'>
							<InputLabel htmlFor='signup-password'>Password</InputLabel>
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
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl variant='outlined'>
							<InputLabel htmlFor='signup-password-confirmation'>
								Password Confirmation
							</InputLabel>
							<OutlinedInput
								label='Password confirmation'
								id='signup-password-confirmation'
								type={values.showPassword ? 'text' : 'password'}
								inputRef={passwordConfirmationRef}
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
						<Button
							variant='contained'
							disabled={loading}
							type='submit'
							style={{ width: '150px', position: 'relative', left: '75px' }}
						>
							Create Account
						</Button>
					</form>
				</Grid>
				<Grid style={{ display: 'flex', justifyContent: 'center' }}>
					Already have an account?<a href='/login'> Log In</a>
				</Grid>
			</Grid>
		</div>
	);
}
