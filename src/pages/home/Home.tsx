import SearchBar from '../../components/searchBar';
import SearchList from '../../components/searchList';
import { getPokemonsPerPage } from '../../services/pokemon.service';
import Loader from '../../components/loader';
import Message from '../../components/message';
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE } from '../../constants';
import { useEffect, useState } from 'react';
import { Pokemon } from '../../components/searchList/types';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination/';
import { getNumberOfPages } from '../../utils/numberOfPages';
import SettingsPanel from '../../components/settingsPanel/';
import { Payload } from '../../components/settingsPanel/types';
import styles from './style.module.scss';

const Home = () => {
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [term, setTerm] = useState(localStorage.getItem('term') ?? '');

  const [itemsOnPage, setItemsOnPage] = useState(ITEMS_ON_PAGE);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('frontpage')) || 1
  );
  const [count, setCount] = useState(0);

  const fetchingPokemons = async (search = '') => {
    setIsLoading(true);

    const { errorMessage, result } = await getPokemonsPerPage(
      itemsOnPage,
      (currentPage - 1) * itemsOnPage,
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

  const handleFormSubmit = (inputTerm: string) => {
    if (term !== inputTerm) {
      setCurrentPage(NUM_OF_START_PAGE);
    }
    setTerm(inputTerm);
    setSearchParams('?frontpage=1');
  };

  const handleSettingsChange = ({ selectedOption }: Payload) => {
    setItemsOnPage(selectedOption.value);
    setCurrentPage(NUM_OF_START_PAGE);
  };

  useEffect(() => {
    fetchingPokemons(term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, currentPage, itemsOnPage]);

  return (
    <div className="container">
      <div className="wrapper">
        <SettingsPanel onItemsChange={handleSettingsChange} />
        <SearchBar onFormSubmit={handleFormSubmit} term={term} />
        {isLoading && <Loader />}
        {errorMsg && <Message errorMessage={errorMsg} />}
        {!isLoading && !errorMsg && filteredPokemons && (
          <SearchList pokemons={filteredPokemons} />
        )}
        {count > itemsOnPage && !isLoading && !errorMsg && (
          <Pagination
            nPages={getNumberOfPages(count, itemsOnPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {searchParams.get('details') && (
          <div className={styles.details}>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
