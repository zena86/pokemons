import styles from './style.module.scss';
import { useRouter } from 'next/router';
import { SearchListProps } from './types';
import Message from '../message/Message';
import PokemonCard from '../pokemonCard/PokemonCard';
import Link from 'next/link';
import { PokemonDescription } from '../pokemonCard/types';
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE } from '@/constants';

const SearchList = ({ pokemons }: SearchListProps) => {
  const router = useRouter();
  const {frontpage, search, limit, details} = router.query;

  return (
    <>
      {pokemons.length === 0 ? (
        <Message errorMessage="No pokemons found" />
      ) : (
        <ul className={styles.list}>
          {pokemons.map((pokemon: PokemonDescription) => {
            return (
              <div key={pokemon.name} role="card">
                <Link
                  className={styles.link}
                  href={`?frontpage=${
                    frontpage || NUM_OF_START_PAGE
                  }&search=${search || ''}&limit=${
                    limit || ITEMS_ON_PAGE
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
