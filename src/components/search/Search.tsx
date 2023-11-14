import SearchBar from '../searchBar';
import SearchList from '../searchList';
import Pagination from '../pagination';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getNumberOfPages } from '../../utils/numberOfPages';
import { Payload } from '../settingsPanel/types';
import SettingsPanel from '../settingsPanel';
import styles from './style.module.scss';
import useGetPokemonsPerPage from '../../hooks/useGetPokemonsPerPage';
import LoaderContent from '../../hoc/LoaderContent';
// import {
//   // SearchContext,
//   SearchDispatchContext,
// } from '../../context/searchContext';
import {
  CHANGE_POKEMONS_PER_PAGE,
  // CHANGE_POKEMONS_PER_PAGE,
  ITEMS_ON_PAGE,
  NUM_OF_START_PAGE,
} from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SearchDispatchContext } from '../../context/searchContext';
//import { pokemonsUpdated } from '../../features/pokemons/pokemonsSlice';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useContext(SearchDispatchContext);
  //const dispatch = useDispatch();

  //const { term } = useContext(SearchContext);
  const term = useSelector((state: RootState) => state.search.term);

  const [itemsOnPage, setItemsOnPage] = useState(
    Number(localStorage.getItem('perPage')) || ITEMS_ON_PAGE
  );
  const [page, setPage] = useState(Number(searchParams.get('frontpage')) || 1);

  const {
    content: { count, pokemons },
    isLoading,
    errorMessage,
  } = useGetPokemonsPerPage({ itemsOnPage, page, term });

  const goToFirstPage = () => {
    setPage(NUM_OF_START_PAGE);
    setSearchParams('frontpage=1');
  };

  const handleFormSubmit = (isTermChanged: boolean) => {
    if (isTermChanged) goToFirstPage();
  };

  const handleSettingsChange = ({ selectedOption }: Payload) => {
    setItemsOnPage(selectedOption.value);
    goToFirstPage();
  };

  const closeDetail = () => {
    searchParams.get('details') &&
      setSearchParams(`?frontpage=${searchParams.get('frontpage')}`);
  };

  const handleChangePage = (page: number) => {
    setPage(page);
    navigate(`?frontpage=${page}`);
  };

  useEffect(() => {
    //dispatch(pokemonsUpdated({ pokemonsList: pokemons }));
    dispatch({
      type: CHANGE_POKEMONS_PER_PAGE,
      payload: { pokemonsPerPage: pokemons },
    });
  }, [term, page, itemsOnPage, pokemons, dispatch]);

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
            <SearchList />
          </LoaderContent>
          {count > itemsOnPage && !isLoading && !errorMessage && (
            <Pagination
              nPages={getNumberOfPages(count, itemsOnPage)}
              page={page}
              onChangePage={handleChangePage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
