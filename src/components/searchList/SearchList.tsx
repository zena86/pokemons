import styles from './style.module.scss';
import { useSearchParams } from 'next/navigation';
import { SearchListProps } from './types';
import Message from '../message/Message';
import PokemonCard from '../pokemonCard/PokemonCard';
import Link from 'next/link';
import { PokemonDescription } from '../pokemonCard/types';

const SearchList = ({ pokemons }: SearchListProps) => {
  const searchParams = useSearchParams();

  return (
    <>
      {pokemons.length === 0 ? (
        <Message errorMessage="No pokemons found" />
      ) : (
        <ul className={styles.list}>
          {pokemons.map((pokemon: PokemonDescription) => {
            return (
              <div key={pokemon.name}>
                <Link
                  className={styles.link}
                  href={`?frontpage=${
                    searchParams.get('frontpage') || 1
                  }&search=${searchParams.get('search') || ''}&limit=${
                    searchParams.get('limit') || 12
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
