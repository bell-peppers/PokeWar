import React from 'react';
import emailjs from 'emailjs-com';
import { Button, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { OutlinedInput } from '@material-ui/core';

export default function ContactUs() {
	function sendEmail(e) {
		e.preventDefault();

		emailjs
			.sendForm('service_yv8eo6e', 'template_rlk6kyv', e.target, 'user_jga7dj2E0iRJ0pqVmhmrg')
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
			e.target.reset();
	}
	return (
		<div style={{ height: '100vh' }}>
			<Grid>
				<Typography
					style={{
						fontFamily: 'Courier New, monospace',
						fontSize: '20px',
						fontWeight: 'bold',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '40px',
					}}
				>
					{' '}
					How can we help?
				</Typography>
				<Typography
					style={{
						fontFamily: 'Courier New, monospace',
						fontSize: '17px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '30px',
					}}
				>
					Send us a message or question and we'll help you as soon as we can.
				</Typography>
			</Grid>
			<Grid
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					maxWidth: '100%',
				}}
			>
				<form
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '450px',
					}}
					onSubmit={sendEmail}
				>
					<FormControl variant='outlined' name='name'>
						<InputLabel htmlFor='name' name='name'>Name</InputLabel>
						<OutlinedInput id='name' name='name' labelWidth={70} />
					</FormControl>
					<FormControl variant='outlined' name='email'>
						<InputLabel htmlFor='email' name='email'>E-mail</InputLabel>
						<OutlinedInput id='email' name='email' labelWidth={70} />
					</FormControl>
					<FormControl variant='outlined' name='message'>
						<InputLabel htmlFor='message' name='message'>Message</InputLabel>
						<OutlinedInput id='message' name='message' multiline rows={7} labelWidth={70} />
					</FormControl>
					<Button
						variant='contained'
						type='submit'
						style={{
							width: '100px',
							position: 'relative',
							alignSelf: 'center',
							backgroundColor: 'royalblue',
							color: 'white',
						}}
					>
						Send
					</Button>
				</form>
				<img src='/pics/contactPokes.png' style={{ width: '500px' }} />
			</Grid>
		</div>
	);
}
