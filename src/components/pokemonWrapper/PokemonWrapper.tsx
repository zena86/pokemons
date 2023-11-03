import { useEffect, useState } from 'react';
import { getPokemon } from '../../services/pokemon.service';
import Message from '../message';
import PokemonCard from '../pokemonCard';
import Loader from '../loader';
import { PokemonDescription } from '../pokemonCard/types';
import { PokemonWrapperProps } from './types';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './style.module.scss';

const PokemonWrapper = ({ url }: PokemonWrapperProps) => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pokemonDescr, setPokemonDescr] = useState<PokemonDescription | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const pokemonResponse = await getPokemon(url);
      return pokemonResponse;
    };

    fetchData()
      .then(({ errorMessage, pokemon }) => {
        if (errorMessage) {
          setError(errorMessage);
          return;
        }
        if (pokemon) {
          setPokemonDescr(pokemon);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <Message errorMessage={error} />}
      {!isLoading && !error && pokemonDescr && (
        <NavLink
          to={`?frontpage=${searchParams.get('frontpage') || 1}&details=${
            pokemonDescr.name
          }`}
          className={styles.link}
        >
          <PokemonCard pokemon={pokemonDescr} />
        </NavLink>
      )}
    </>
  );
};
export default PokemonWrapper;
