import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PokemonDescription } from '../components/pokemonCard/types';
import { getPokemonByName } from '../services/pokemon';
import { HookRespond } from '../hoc/LoaderContent/types';

const useGetPokemonByName = (): HookRespond => {
  const [searchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState<PokemonDescription>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const name = searchParams.get('details');

    if (!name) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      return await getPokemonByName(name);
    };

    fetchData()
      .then(({ errorMessage, result }) => {
        if (errorMessage) {
          setErrorMessage(errorMessage);
          return;
        }
        if (result) {
          setPokemon(result);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  return { content: pokemon, isLoading, errorMessage };
};

export default useGetPokemonByName;
