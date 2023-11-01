import SearchBar from '../../components/searchBar';
import SearchList from '../../components/searchList';
import { getPokemonsPerPage } from '../../services/pokemon.service';
import Loader from '../../components/loader';
import Message from '../../components/message';
import { ITEMS_ON_PAGE } from '../../constants';
import { useEffect, useState } from 'react';
import { Pokemon } from '../../components/searchList/types';
import ErrorButton from '../../components/errorButton/';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination/';
import { getNumberOfPages } from '../../utils/numberOfPages';

const Home = () => {
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [term] = useState(localStorage.getItem('term') ?? '');

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('frontpage')) || 1
  );
  const [count, setCount] = useState(0);

  const fetchingPokemons = async (search = '') => {
    setIsLoading(true);

    const { errorMessage, result } = await getPokemonsPerPage(
      ITEMS_ON_PAGE,
      (currentPage - 1) * ITEMS_ON_PAGE,
      //NUM_OF_START_PAGE,
      search
    );

    if (errorMessage) {
      setIsLoading(false);
      setErrorMsg(errorMessage);
      return;
    }

    if (result?.pokemons) {
      setIsLoading(false);
      setFilteredPokemons(result.pokemons);
      setCount(result.count);
    }
  };

  const handleFormSubmit = async (term: string) => {
    await fetchingPokemons(term);
    setSearchParams('?frontpage=1');
  };

  useEffect(() => {
    fetchingPokemons(term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, currentPage]);

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
        {count > ITEMS_ON_PAGE && (
          <Pagination
            nPages={getNumberOfPages(count, ITEMS_ON_PAGE)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
