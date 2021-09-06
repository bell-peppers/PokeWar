import React, { useState, useRef } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	main: {
		fontFamily: 'Courier New, monospace',
		display: 'flex',
		height: '500px',
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
	},
	signIn: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid black',
		cursor: 'pointer',
		margin: '5px',
	},
}));

export default function ContactUs() {
	const classes = useStyles();
	const nameRef = useRef();
	const emailRef = useRef();
	const messageRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [values, setValues] = React.useState({
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			login(emailRef.current.value, passwordRef.current.value);
			history.push('/');
		} catch (error) {
			console.error(error);
			setError(error.message);
		}
		setLoading(false);
	}

	return (
		<div>
			<Grid>
				<Typography
					style={{
						fontFamily: 'Courier New, monospace',
						fontSize: '20px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					How can we help? Send us a message or question and we'll ep you as
					soon as we can.
				</Typography>
			</Grid>
			<Grid style={{ display: 'fixed', right: '30px' }}>
				<Grid
					style={{
						display: 'flex',
						flexDirection: 'column',
						maxWidth: '450px',
					}}
				>
					<FormControl variant='outlined'>
						<InputLabel htmlFor='name'>Name</InputLabel>
						<OutlinedInput id='name' inputRef={nameRef} labelWidth={70} />
					</FormControl>
					<FormControl variant='outlined'>
						<InputLabel htmlFor='email'>E-mail</InputLabel>
						<OutlinedInput id='email' inputRef={emailRef} labelWidth={70} />
					</FormControl>
					<FormControl variant='outlined'>
						<InputLabel htmlFor='message'>Message</InputLabel>
						<OutlinedInput
							id='message'
							multiline
							rows={7}
							inputRef={messageRef}
							labelWidth={70}
						/>
					</FormControl>
					<Button
						variant='contained'
						disabled={loading}
						type='submit'
						style={{
							width: '100px',
							position: 'relative',
							alignSelf: 'center',
						}}
					>
						Send
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}
