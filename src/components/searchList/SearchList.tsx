// import { Pokemon, SearchListProps } from './types';
// import style from './style.module.scss';
// import PokemonCard from '../pokemonCard/PokemonCard';
// import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './style.module.scss';
import { useSearchParams } from 'next/navigation';

import { Pokemon, SearchListProps } from './types';
import Message from '../message/Message';
import PokemonCard from '../pokemonCard/PokemonCard';
import Link from 'next/link';

const SearchList = ({ pokemons }: SearchListProps) => {
  const searchParams = useSearchParams();

  return (
    //<h1>Search list</h1>
    <>
      {pokemons.length === 0 ? (
        <Message errorMessage="No pokemons found" />
      ) : (
        <ul className={styles.list}>
          {pokemons.map((pokemon: Pokemon) => {
            return (
              <div key={pokemon.name}>
                {/* // <NavLink
              //   to={`?frontpage=${searchParams.get('frontpage') || 1}&details=${
              //     pokemon.name
              //   }`}
              //   className={styles.link}
              //   key={pokemon.name}
              // >
              <PokemonCard pokemon={pokemon} />
              // </NavLink> */}

                <Link
                  href={`?frontpage=${
                    searchParams.get('frontpage') || 1
                  }&details=${pokemon.name}`}
                >
                  <PokemonCard pokemon={pokemon} />
                </Link>
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SearchList;
