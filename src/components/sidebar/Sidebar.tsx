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
import LoaderContent from '../../HOK/LoaderContent/LoaderContent';
import { Pokemon } from '../searchList/types';

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState(localStorage.getItem('term') ?? '');
  const [itemsOnPage, setItemsOnPage] = useState(ITEMS_ON_PAGE);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('frontpage')) || 1
  );

  const respond = useGetPokemonsPerPage({
    itemsOnPage,
    currentPage,
    search: term,
  });

  const {
    content: { count, pokemons },
    isLoading,
    errorMessage,
  } = respond;

  const handleFormSubmit = (inputTerm: string) => {
    if (term !== inputTerm) {
      setCurrentPage(NUM_OF_START_PAGE);
      setSearchParams('?frontpage=1');
    }
    setTerm(inputTerm);
  };

  const handleSettingsChange = ({ selectedOption }: Payload) => {
    setItemsOnPage(selectedOption.value);
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
          <LoaderContent respond={respond}>
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
