import { useState, useEffect } from 'react';
import { PokemonDescription } from '../components/pokemonCard/types';
import { getPokemon } from '../services/pokemon.service';
import { HookRespond } from '../hok/LoaderContent/types';

const useGetPokemonByUrl = (url: string): HookRespond => {
  const [pokemon, setPokemon] = useState<PokemonDescription>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      return await getPokemon(url);
    };

    fetchData()
      .then(({ errorMessage, pokemon }) => {
        if (errorMessage) {
          setErrorMessage(errorMessage);
          return;
        }
        if (pokemon) {
          setPokemon(pokemon);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { content: pokemon, isLoading, errorMessage };
};

export default useGetPokemonByUrl;
