import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Button, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { CardMedia } from '@material-ui/core';
import Image from 'material-ui-image';
import { useAuth } from '../../src/contexts/AuthContext';
import { getUserData } from '../store/userData';
import { fetchPlayerOnePokemon } from '../store/pokemon';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import { storage } from '../../utils/firebase';
import 'firebase/database';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
	main: {
		fontFamily: 'Courier New, monospace',
		// display: 'flex',
		// flex: '1',
		backgroundColor: 'royalBlue',
		position: 'relative',
		maxWidth: '1018px',
		// minHeight: '224px',
		paddingBottom: '0px',
		margin: '0 auto',
		// flexWrap: 'nowrap',

		// maxWidth: '960px',
		// position: 'relative'
		// height: '600px',
		// flexDirection: 'column',
		// justifyContent: 'center',
		// margin: '0  100px 0 100px'
	},
	root: {
		// flexWrap: 'nowrap',
		width: '400px',
		margin: '30px',
	},
	container: {
		// flexWrap: 'nowrap',
		height: 440,
	},
	cards: {
		display: 'flex',
		// flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(8),
			height: theme.spacing(11),
		},
		imageRoot: {
			display: 'flex',
			// flexWrap: 'nowrap',
			// width: '350px',
			justifyContent: 'space-around',
			overflow: 'hidden',
			backgroundColor: theme.palette.background.paper,
		},
		title: {
			color: theme.palette.primary.light,
		},
		titleBar: {
			background:
				'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
		},
	},
}));

function EditProfile(props) {
	const { user, playerPokemon, fetchPokemon, getUserData } = props;
	// const playerPokemon = useSelector((state) => state.pokemon.playerOnePokemon);
	const { currentUser, username } = useAuth();
	const classes = useStyles();

	const [image, setImage] = useState(null);
	const [usernameValue, setUsername] = useState('');
	const [url, setUrl] = useState('');
	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		const uploadTask = storage.ref(`images/${currentUser.uid}`).put(image);
		uploadTask.on('state_changed', () => {
			storage
				.ref('images/')
				.child(currentUser.uid)
				.getDownloadURL()
				.then((url) => {
					setUrl(url);
					currentUser
						.updateProfile({
							photoURL: url,
						})
						.then(() => {
							console.log('hey', url, currentUser);
						})
						.catch((error) => {
							console.log(error);
						});
				});
		});
	};

	useEffect(() => {
		if (currentUser && currentUser.uid !== user.uid) {
			getUserData(currentUser.uid);
		}
	}, [user, currentUser]);

	return (
		<div>
			<Grid className={classes.main}>
				<Grid
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}
				>
					<Grid>
						<Grid>
							<img
								src={url || 'http://via.placeholder.com/300'}
								alt='firebase-image'
							/>
							<input type='file' onChange={handleChange} />
							<button onClick={handleUpload}>Upload</button>
						</Grid>

						<form>
							<TextField
								id='username'
								placeholder={user.username}
								variant='filled'
								value={usernameValue}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</form>
					</Grid>
					{/* {playerPokemon && console.log(playerPokemon)} */}
				</Grid>
				<Grid>
					<Button href='/myprofile'>Save</Button>
				</Grid>
			</Grid>
			<Grid className={classes.main}>
				<Grid
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						margin: '0 50px 30px 25px',
						paddingLeft: '9px',
						paddingTop: '50px',
					}}
				></Grid>
			</Grid>
		</div>
	);
}

const mapState = (state) => {
	// console.log(state.pokemon)
	return {
		playerPokemon: state.pokemon.playerOnePokemon,
		user: state.userData.user,
	};
};
const mapDispatch = (dispatch) => {
	return {
		fetchPokemon: (pk) => dispatch(fetchPlayerOnePokemon(pk)),
		getUserData: (uid) => dispatch(getUserData(uid)),
	};
};
export default connect(mapState, mapDispatch)(EditProfile);
