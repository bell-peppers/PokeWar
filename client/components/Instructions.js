import React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

export default function Instructions() {
	return (
		<Grid>
			<Typography
				style={{
					fontFamily: 'Courier New, monospace',
					fontSize: '20px',
					fontWeight: 'bold',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '60px 0px 0px 0px',
				}}
			>
				Where should I start?
			</Typography>
			<Grid
				style={{
					display: 'flex',
					justifyContent: 'center',
					padding: '50px 0px 30px 0px',
				}}
			>
				<CardMedia
					component='img'
					image={'/pics/instructions1.gif'}
					style={{ width: '800px' }}
				></CardMedia>
			</Grid>
		</Grid>
	)
}
