import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../store/allPokemon';
import Card from '@material-ui/core/Card';
import { CardContent, Typography } from '@material-ui/core';

/**
 * COMPONENT
 */
export default function AllPokemon(props) {
  const pokemon = useSelector((state) => state.pokemon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  console.log(pokemon);
  return (
    <div>
      {pokemon.map((poke) => {
        return (
          <Card className="PokeCards" key={poke.id}>
            <CardContent>
              <Typography>#{poke.order}</Typography>
              <Typography>
                <img
                  src={poke.sprites.other['official-artwork'].front_default}
                />
              </Typography>
              <Typography>{poke.name}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
