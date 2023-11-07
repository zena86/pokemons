import { Pokemon } from './types';
import Message from '../message';
import style from './style.module.scss';
import PokemonWrapper from '../pokemonWrapper';
import { useContext } from 'react';
import { SearchContext } from '../../context/searchContext';

const SearchList = () => {
  const state = useContext(SearchContext);
  const { pokemonsPerPage } = state;
  return (
    <>
      {pokemonsPerPage.length === 0 ? (
        <Message errorMessage="No pokemons found" />
      ) : (
        <ul className={style.list}>
          {pokemonsPerPage.map((pokemon: Pokemon) => {
            return <PokemonWrapper key={pokemon.name} url={pokemon.url} />;
          })}
        </ul>
      )}
    </>
  );
};

export default SearchList;
