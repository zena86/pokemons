import SearchBar from '../searchBar/';
import SearchList from '../searchList/';
import Pagination from '../pagination/';
import { useContext, useEffect, useState } from 'react';
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE } from '../../constants';
import { useSearchParams } from 'react-router-dom';
import { getNumberOfPages } from '../../utils/numberOfPages';
import { Payload } from '../settingsPanel/types';
import SettingsPanel from '../settingsPanel/';
import styles from './style.module.scss';
import useGetPokemonsPerPage from '../../hooks/useGetPokemonsPerPage';
import { Pokemon } from '../searchList/types';
import LoaderContent from '../../hok/LoaderContent';
import { SearchContext } from '../../context/searchContext';

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { term } = useContext(SearchContext);

  const [itemsOnPage, setItemsOnPage] = useState(
    Number(localStorage.getItem('perPage')) || ITEMS_ON_PAGE
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('frontpage')) || 1
  );

  const {
    content: { count, pokemons },
    isLoading,
    errorMessage,
  } = useGetPokemonsPerPage({
    itemsOnPage,
    currentPage,
    search: term,
  });

  const handleFormSubmit = (isTermChanged: boolean) => {
    if (isTermChanged) {
      setCurrentPage(NUM_OF_START_PAGE);
      setSearchParams('?frontpage=1');
    }
  };

  const handleSettingsChange = ({ selectedOption }: Payload) => {
    setItemsOnPage(selectedOption.value);
    setCurrentPage(NUM_OF_START_PAGE);
    setSearchParams('frontpage=1');
  };

  const closeDetail = () => {
    searchParams.get('details') &&
      setSearchParams(`?frontpage=${searchParams.get('frontpage')}`);
  };

  useEffect(() => {}, [term, currentPage, itemsOnPage]);

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
          <SearchBar onFormSubmit={handleFormSubmit} />
          <LoaderContent isLoading={isLoading} errorMessage={errorMessage}>
            {pokemons ? <SearchList pokemons={pokemons as Pokemon[]} /> : <></>}
          </LoaderContent>
          {count > itemsOnPage && !isLoading && !errorMessage && (
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
