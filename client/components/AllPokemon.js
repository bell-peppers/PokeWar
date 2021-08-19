import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../store/allPokemon';
import Card from '@material-ui/core/Card';
import { CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { colorTypeGradients } from '../../utils/ColorGradientFunc';

/**
 * COMPONENT
 */
const useStyles = makeStyles((theme) => ({
  PokeCards: {
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: '#495057',
    width: '200px',
    margin: '10px',
  },
}));

export default function AllPokemon(props) {
  const pokemon = useSelector((state) => state.pokemon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  const classes = useStyles();
  console.log(pokemon);
  return (
    <div className="main">
      {pokemon.map((poke) => {
        let finalColor;

        if (poke.types.length === 2) {
          finalColor = colorTypeGradients(
            poke.types[0].type.name,
            poke.types[1].type.name,
            poke.types.length
          );
        } else {
          finalColor = colorTypeGradients(
            poke.types[0].type.name,
            poke.types[0].type.name,
            poke.types.length
          );
        }

        return (
          <Card
            className={classes.PokeCards}
            key={poke.id}
            style={{
              background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
            }}
          >
            <CardContent>
              <Typography>#{poke.id}</Typography>
              <Typography>
                <img
                  className="cardPic"
                  src={poke.sprites.other['official-artwork'].front_default}
                />
              </Typography>
              <Typography className="data">{poke.name}</Typography>
              {poke.types.length === 2 ? (
                <Typography
                  style={{
                    display: 'flex',
                    width: '100px',
                    height: '20px',
                    marginTop: '4px',
                    marginLeft: '20%',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <img src={`assets/${poke.types[0].type.name}.png`} />
                  <img src={`assets/${poke.types[1].type.name}.png`} />
                </Typography>
              ) : (
                <Typography
                  style={{
                    display: 'flex',
                    width: '20px',
                    height: '20px',
                    marginTop: '4px',
                    marginLeft: '45%',
                  }}
                >
                  <img src={`assets/${poke.types[0].type.name}.png`} />
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
