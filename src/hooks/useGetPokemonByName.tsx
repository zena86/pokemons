import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PokemonDescription } from '../components/pokemonCard/types';
import { getPokemonByName } from '../services/pokemon.service';

function useGetPokemonByName() {
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
  }, [searchParams]);

  return { pokemon, isLoading, errorMessage };
}

export default useGetPokemonByName;
