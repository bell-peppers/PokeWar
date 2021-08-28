import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPokemon} from '../store/allPokemon';
import {fetchlegends} from '../store/pokeStore';
import Loading from './Loading';

const Store = (props) => {
  const pokemon = useSelector((state) => state.allPokemon);
  // const pokemon = useSelector((state) => state.legendaries);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchlegends());
    dispatch(fetchPokemon(0)).then(() => {
      setIsLoading(false);
    });
  });

  return <div className='main'>{isLoading ? <Loading /> : <div></div>}</div>;
};

export default Store;
