import { Pokemon } from './types';
import Message from '../message';
import style from './style.module.scss';
import PokemonCard from '../pokemonCard/PokemonCard';
// import { useContext } from 'react';
// import { SearchContext } from '../../context/searchContext';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const SearchList = () => {
  const [searchParams] = useSearchParams();
  // const { pokemonsPerPage } = useContext(SearchContext);
  const pokemons = useSelector((state: RootState) => state.pokemons.pokemons);

  return (
    <>
      {pokemons.length === 0 ? (
        <Message errorMessage="No pokemons found" />
      ) : (
        <ul className={style.list}>
          {pokemons.map((pokemon: Pokemon) => {
            return (
              <NavLink
                to={`?frontpage=${searchParams.get('frontpage') || 1}&details=${
                  pokemon.name
                }`}
                className={styles.link}
                key={pokemon.name}
              >
                <PokemonCard pokemon={pokemon} />
              </NavLink>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SearchList;
