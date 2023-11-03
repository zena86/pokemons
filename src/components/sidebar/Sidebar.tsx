import SearchBar from '../searchBar/';
import SearchList from '../searchList/';
import Pagination from '../pagination/';
import { useEffect, useState } from 'react';
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE } from '../../constants';
import { useSearchParams } from 'react-router-dom';
import { getNumberOfPages } from '../../utils/numberOfPages';
import { Payload } from '../settingsPanel/types';
import SettingsPanel from '../settingsPanel/';
import styles from './style.module.scss';
import useGetPokemonsPerPage from '../../hooks/useGetPokemonsPerPage';
import { Pokemon } from '../searchList/types';
import LoaderContent from '../../hok/LoaderContent';

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState(localStorage.getItem('term') ?? '');
  const [itemsOnPage, setItemsOnPage] = useState(
    Number(localStorage.getItem('perPage')) ?? ITEMS_ON_PAGE
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

  const handleFormSubmit = (inputTerm: string) => {
    if (term !== inputTerm) {
      setCurrentPage(NUM_OF_START_PAGE);
      setSearchParams('?frontpage=1');
    }
    setTerm(inputTerm);
  };

  const handleSettingsChange = ({ selectedOption }: Payload) => {
    setItemsOnPage(selectedOption.value);
    console.log('selectedOption.value', selectedOption.value);
    console.log('itemsOnPage', itemsOnPage);
    localStorage.setItem('perPage', String(selectedOption.value));
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
          <SearchBar onFormSubmit={handleFormSubmit} term={term} />
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
