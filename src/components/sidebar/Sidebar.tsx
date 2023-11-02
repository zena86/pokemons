import SearchBar from '../searchBar/';
import Loader from '../loader/';
import SearchList from '../searchList/';
import Pagination from '../pagination/';
import Message from '../message/';
import { useEffect, useState } from 'react';
import { Pokemon } from '../searchList/types';
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE } from '../../constants';
import { useSearchParams } from 'react-router-dom';
import { getPokemonsPerPage } from '../../services/pokemon.service';
import { getNumberOfPages } from '../../utils/numberOfPages';
import { Payload } from '../settingsPanel/types';
import SettingsPanel from '../settingsPanel/';
import styles from './style.module.scss';

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [term, setTerm] = useState(localStorage.getItem('term') ?? '');

  const [itemsOnPage, setItemsOnPage] = useState(ITEMS_ON_PAGE);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('frontpage')) || 1
  );

  const [count, setCount] = useState(0);

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
    setSearchParams('frontpage=1');
  };

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

  const closeDetail = () => {
    searchParams.get('details') &&
      setSearchParams(`?frontpage=${searchParams.get('frontpage')}`);
  };

  useEffect(() => {
    fetchingPokemons(term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, currentPage, itemsOnPage]);

  return (
    <div
      className={`${styles.sidebar} ${
        searchParams.get('details') ? styles.disabled : ''
      }`}
      onClick={closeDetail}
    >
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
