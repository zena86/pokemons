import { useState, useEffect } from 'react';
import { getPokemonsPerPage } from '../services/pokemon';
import { GetPokemonsPerPageProps } from './types';
import { Pokemon } from '../components/searchList/types';

const useGetPokemonsPerPage = ({
  itemsOnPage,
  page,
  term,
}: GetPokemonsPerPageProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      return await getPokemonsPerPage(
        itemsOnPage,
        (page - 1) * itemsOnPage,
        term
      );
    };

    fetchData()
      .then(({ errorMessage, result }) => {
        if (errorMessage) {
          setErrorMessage(errorMessage);
          return;
        }
        if (result) {
          setPokemons(result.pokemons);
          setCount(result.count);
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, itemsOnPage, term]);

  return { content: { count, pokemons }, isLoading, errorMessage };
};

export default useGetPokemonsPerPage;
