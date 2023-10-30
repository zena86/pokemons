import { useEffect, useState } from 'react';
import { getPokemon } from '../../services/pokemon.service';
import Message from '../message';
import PokemonCard from '../pokemonCard';
import Loader from '../loader';
import { PokemonDescription } from '../pokemonCard/types';
import { PokemonWrapperProps } from './types';

const PokemonWrapper = ({ url }: PokemonWrapperProps) => {
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
        <PokemonCard pokemon={pokemonDescr} />
      )}
    </>
  );
};
export default PokemonWrapper;
