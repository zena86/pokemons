import styles from './style.module.scss';
import { useSearchParams } from 'next/navigation';
import { Pokemon, SearchListProps } from './types';
import Message from '../message/Message';
import PokemonCard from '../pokemonCard/PokemonCard';
import Link from 'next/link';

const SearchList = ({ pokemons }: SearchListProps) => {
  const searchParams = useSearchParams();

  return (
    <>
      {pokemons.length === 0 ? (
        <Message errorMessage="No pokemons found" />
      ) : (
        <ul className={styles.list}>
          {pokemons.map((pokemon: Pokemon) => {
            return (
              <div key={pokemon.name}>
                <Link
                  className={styles.link}
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
