import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Button, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { CardMedia } from '@material-ui/core';
import Image from 'material-ui-image';
import { useAuth } from '../../src/contexts/AuthContext';
import { getUserData } from '../store/userData';
import { fetchPlayerOnePokemon } from '../store/pokemon';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import { FIREDB } from '../../utils/firebase';
import 'firebase/database';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
	main: {
		fontFamily: 'Courier New, monospace',
		display: 'flex',
		backgroundColor: 'green',
		// flexWrap: 'nowrap',
		width: '100%',
		height: '600px',
		flexDirection: 'column',
		justifyContent: 'space-around',
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

const EditProfile = (props) => {
	const { user, playerPokemon, fetchPokemon, getUserData } = props;
	// const playerPokemon = useSelector((state) => state.pokemon.playerOnePokemon);
	const { currentUser, username } = useAuth();
	const classes = useStyles();
	const [image, setImage] = useState({ preview: '', raw: '' });

	const handleChange = (e) => {
		if (e.target.files.length) {
			setImage({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
		}
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', image.raw);

		await fetch('YOUR_URL', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: formData,
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
					style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
				>
					POKEWARS
				</Grid>
				<Grid
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}
				>
					<Grid>
						<CardMedia
							style={{
								width: '150px',
								height: '150px',
								border: '5px solid blue',
							}}
						>
							{user && (
								<Image src={user.photoUrl} />
							)
							// : (
							// 	<Image src='http://localhost:8080//pics/default.png' />
							// )
							}
						</CardMedia>
						<div>
							<label htmlFor='upload-button'>
								{image.preview ? (
									<img
										src={image.preview}
										alt='dummy'
										width='300'
										height='300'
									/>
								) : (
									<>
										<span className='fa-stack fa-2x mt-3 mb-2'>
											<i className='fas fa-circle fa-stack-2x' />
											<i className='fas fa-store fa-stack-1x fa-inverse' />
										</span>
										<h5 className='text-center'>Upload your photo</h5>
									</>
								)}
							</label>
							<input
								type='file'
								id='upload-button'
								style={{ display: 'none' }}
								onChange={handleChange}
							/>
							<br />
							{currentUser && <button onClick={handleUpload}>Upload{user.photoUrl = image.preview}</button>}
              {currentUser && console.log(user.photoUrl)}
						</div>
						<Typography>
							Upload a file from your device. Image should be square
						</Typography>

						<form>
							<TextField
								id='username'
								placeholder={user.username}
								variant='filled'
							/>
						</form>
					</Grid>
					{/* {playerPokemon && console.log(playerPokemon)} */}
				</Grid>
				<Grid>
					<Button href='/myprofile'>Save</Button>
				</Grid>
			</Grid>
		</div>
	);
};

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
