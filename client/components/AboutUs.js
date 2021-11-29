import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import CardMedia from '@material-ui/core/CardMedia'
import creators from '../data/aboutUs'

const useStyles = makeStyles(() => ({
	h3: {
		maxWidth: '295px',
		fontSize: '20px',
		margin: '10px',
		overflow: 'hidden',
		fontFamily: 'Courier New, monospace',
	},
	links: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: '40px 0 50px 0',
	},
	card: {
		display: 'flex',
		justifyContent: 'center',
		paddingTop: '80px',
		paddingBottom: '40px',
	},
	cardmedia: {
		width: '320px',
		height: '250px',
	},
}))

export default function AboutUs() {
	const classes = useStyles()
	return (
		<Grid>
			{creators.map((creator) => (
				<Grid className={classes.card}>
					<CardMedia>
						<img src={creator.pic} className={classes.cardmedia} />
					</CardMedia>
					<Typography className={classes.h3}>{creator.description}</Typography>
					<Grid className={classes.links}>
						<Link to={{ pathname: creator.github }} target='_blank'>
							<GitHubIcon />
						</Link>
						<Link to={{ pathname: creator.linkedin }} target='_blank'>
							<LinkedInIcon />
						</Link>
					</Grid>
				</Grid>
			))}
		</Grid>
	)
}
