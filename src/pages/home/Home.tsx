import SearchBar from '../../components/searchBar';
import SearchList from '../../components/searchList';
import { getPokemonsPerPage } from '../../services/pokemon.service';
import Loader from '../../components/loader';
import Message from '../../components/message';
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE } from '../../constants';
import { useEffect, useState } from 'react';
import { Pokemon } from '../../components/searchList/types';
import ErrorButton from '../../components/errorButton/ErrorButton';

const Home = () => {
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [term] = useState(localStorage.getItem('term') ?? '');

  const fetchingPokemons = async (search = '') => {
    setIsLoading(true);

    const { errorMessage, pokemons } = await getPokemonsPerPage(
      ITEMS_ON_PAGE,
      NUM_OF_START_PAGE,
      search
    );

    if (errorMessage) {
      setIsLoading(false);
      setErrorMsg(errorMessage);
      return;
    }

    if (pokemons) {
      setIsLoading(false);
      setFilteredPokemons(pokemons);
    }
  };

  const handleFormSubmit = async (term: string) => {
    await fetchingPokemons(term);
  };

  useEffect(() => {
    fetchingPokemons(term);
  }, [term]);

  return (
    <div className="container">
      <div className="wrapper">
        <ErrorButton />
        <SearchBar onFormSubmit={handleFormSubmit} term={term} />
        {isLoading && <Loader />}
        {errorMsg && <Message errorMessage={errorMsg} />}
        {!isLoading && !errorMsg && filteredPokemons && (
          <SearchList pokemons={filteredPokemons} />
        )}
      </div>
    </div>
  );
};

export default Home;
