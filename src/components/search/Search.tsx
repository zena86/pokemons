import SearchBar from '../searchBar';
import SearchList from '../searchList';
import Pagination from '../pagination';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getNumberOfPages } from '../../utils/numberOfPages';
import Select from '../select/Select';
import styles from './style.module.scss';
import LoaderContent from '../../hoc/LoaderContent';
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetPokemonsQuery } from '../../redux/pokemonsApi';
import { pokemonsUpdated } from '../../features/pokemons/pokemonsSlice';
import { selectOptions } from '../../constants';
import { Option } from '../select/types';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('frontpage')) || 1);
  const term = useSelector((state: RootState) => state.search.term);
  const [limit, setLimit] = useState(
    Number(localStorage.getItem('perPage')) || ITEMS_ON_PAGE
  );

  const { data, isLoading, isError, error } = useGetPokemonsQuery({
    limit,
    page,
    search: term,
  });

  const count = data?.count ?? 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pokemons = data?.pokemons ?? [];

  const goToFirstPage = () => {
    setPage(NUM_OF_START_PAGE);
    setSearchParams('frontpage=1');
  };

  const handleFormSubmit = (isTermChanged: boolean) => {
    if (isTermChanged) goToFirstPage();
  };

  const handleSettingsChange = (selectedOption: Option) => {
    setLimit(selectedOption.value);
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
    dispatch(
      pokemonsUpdated({
        pokemons: pokemons,
      })
    );
  }, [term, page, dispatch, pokemons, limit]);

  return (
    <div
      className={`${styles.sidebar} ${
        searchParams.get('details') ? styles.disabled : ''
      }`}
      onClick={closeDetail}
    >
      <div className="container">
        <div className="wrapper">
          <Select options={selectOptions} onChange={handleSettingsChange} />
          <SearchBar onFormSubmit={handleFormSubmit} />
          <LoaderContent
            isLoading={isLoading}
            errorMessage={error ? `${error}` : ''}
          >
            <SearchList />
          </LoaderContent>
          {count > limit && !isLoading && !isError && (
            <Pagination
              nPages={getNumberOfPages(count, limit)}
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
