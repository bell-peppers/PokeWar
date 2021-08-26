import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
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
import { useHistory } from 'react-router-dom';
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

const UserProfile = (props) => {
	const { user, playerPokemon, fetchPokemon, getUserData } = props;
	// const playerPokemon = useSelector((state) => state.pokemon.playerOnePokemon);
	const history = useHistory();
	const { currentUser } = useAuth();
	console.log('current user ==>', currentUser);
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentUser && currentUser.uid !== user.uid) {
			getUserData(currentUser.uid);

			// fetchPokemon(Object.keys(currentUser))
			fetchPokemon(user.pokemon);
		}
	}, [user, currentUser]);

	const [clicked, setClicked] = useState(false);

	const handleIconClick = (poke) => {
		console.log(poke);
		if (!poke.liked) {
			poke.liked = true;
			setClicked(true);
		} else {
			poke.liked = false;
			setClicked(false);
		}
		console.log(poke);
	};

	return (
		<Grid className={classes.main}>
			<Grid
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					margin: '0 50px 30px 25px',
					paddingLeft: '9px',
					paddingTop: '50px',
				}}
			>
				<Grid style={{ display: 'flex' }}>
					<CardMedia
						style={{
							width: '180px',
							height: '180px',
							border: '5px solid darkBlue',
							margin: '0 20px 0 0',
						}}
					>
						{user && <Image src={user.photoUrl} />}
					</CardMedia>
					<Typography style={{ fontSize: '25px' }}>{user.username}</Typography>
				</Grid>
				<Grid>
					<Typography
						style={{ display: 'flex', fontSize: '25px', paddingRight: '80px' }}
					>
						Level
						<Typography
							style={{
								height: '40px',
								width: '40px',
								display: 'table-cell',
								textAlign: 'center',
								verticalAlign: 'middle',
								borderRadius: '50%',
								background: 'white',
								fontSize: '25px',
								marginLeft: '4px',
							}}
						>
							1
						</Typography>
					</Typography>
					<Button
						style={{ padding: '0', marginTop: '6px' }}
						href='/editprofile'
					>
						Edit Profile
					</Button>
				</Grid>
			</Grid>
			<Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Grid
					style={{
						width: '450px',
						marginLeft: '20px',
						minHeight: '243px',
						paddingBottom: '10px',
					}}
				>
					<Typography style={{ fontSize: '18px', marginBottom: '8px' }}>
						My Pokemon
					</Typography>
					{playerPokemon && playerPokemon.length ? (
						<div className={classes.imageRoot}>
							<ImageList
								cols={2.5}
								style={{
									display: 'flex',
									flexWrap: 'nowrap',
									border: '5px solid grey',
								}}
							>
								{playerPokemon.map((item) => (
									<ImageListItem key={item.id} style={{ width: '150px' }}>
										<img src={item.sprites.front_default} />
										<ImageListItemBar
											actionIcon={
												<IconButton
													onClick={() => handleIconClick(item)}
													className={classes.title}
												>
													{item.liked ? (
														<FavoriteIcon />
													) : (
														<FavoriteBorderIcon />
													)}
												</IconButton>
											}
										/>
									</ImageListItem>
								))}
							</ImageList>
						</div>
					) : null}
				</Grid>
				<Grid>
					<Typography style={{ fontSize: '18px', paddingRight: '175px' }}>
						Badges
					</Typography>
					<Grid
						style={{ backgroundColor: 'white', width: '180px', height: '90px' }}
					>
					</Grid>
				</Grid>
			</Grid>
			<Grid style={{display: 'flex', justifyContent: 'space-between'}}><Grid style={{ display: 'flex', flexDirection: 'column' }}>
				<Grid>
					<Typography
						style={{
							fontSize: '20px',
							paddingLeft: '20px',
							paddingTop: '20px',
						}}
					>
						Inventory
					</Typography>
				</Grid>
				<Grid style={{ paddingLeft: '20px', paddingTop: '20px', paddingBottom: '10px' }}>
					<Typography style={{ fontSize: '20px' }}>Comments</Typography>
					<Grid
						style={{
							backgroundColor: 'white',
							width: '450px',
							height: '150px',
						}}
					></Grid>
				</Grid>
			</Grid>
			<Grid><Typography  style={{ fontSize: '18px', paddingRight: '175px' }}>Friends</Typography>	<Grid
						style={{ backgroundColor: 'white', width: '200px', height: '220px' }}
					>
					</Grid></Grid></Grid>
			{/* <Grid>
					<Button
						onClick={() =>
							alert(
								'Friend invite sent. They will appear as a friend once they have accepted your invite'
							)
						}
					>
						Add Friend
					</Button>
				</Grid> */}
		</Grid>
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
export default connect(mapState, mapDispatch)(UserProfile);
