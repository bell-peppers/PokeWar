import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography, SvgIcon } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Image from 'material-ui-image';

const useStyles = makeStyles((theme) => ({
	h3: {
		maxWidth: '295px',
		fontSize: '20px',
		margin: '10px',
		overflow: 'hidden',
		fontFamily: 'Courier New, monospace',
	},
}));

export default function AboutUs() {
	const classes = useStyles();
	return (
		<div>
			<React.Fragment>
				<CssBaseline />
					<Grid style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
            <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '40px 0 50px 0' }}>
						<Link
							to={{ pathname: 'https://github.com/hitaya1' }}
							target='_blank'
						>
							<SvgIcon>
								<GitHubIcon />
							</SvgIcon>
						</Link>
						<Link
							to={{ pathname: 'https://www.linkedin.com/in/taissiya-ugay/' }}
							target='_blank'
						>
							<SvgIcon>
								<LinkedInIcon />
							</SvgIcon>
						</Link></Grid>
						<Typography className={classes.h3}>
							Hi! I am Taya. I love to play video games, my favorite one is Dota
							2. I was excited to make a game with Mike, Nick & Gus. It was an
							awesome experience! I hope you enjoy the game as much as we
							enjoyed making it.
						</Typography>
						<CardMedia
							style={{
								// marginTop: '100px',
								width: 300,
								// margin: 'auto',
								// justifyContent: 'center',
							}}
						>
							<Image
								src='/pics/taya.jpg'
								style={{
									width: '280px',
									height: '10%',
								}}
							></Image>
						</CardMedia>
					</Grid>
			</React.Fragment>
		</div>
	);
}
