import { useRouter } from 'next/router';
import styles from './style.module.scss';
import Select from '../select/Select';
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE, selectOptions } from '@/constants';
import SearchBar from '../searchBar/SearchBar';
import SearchList from '../searchList/SearchList';
import { getNumberOfPages } from '@/utils/numberOfPages';
import Pagination from '../pagination/Pagination';
import { PokemonsRequestProps } from '@/redux/types';

const Search = ({ pokemonsRequest }: PokemonsRequestProps) => {
  const { count, pokemons } = pokemonsRequest;
  const router = useRouter();
  const {frontpage, search, limit, details} = router.query;

  const closeDetail = () => {
    if (details) {
      router.push(
        `?frontpage=${frontpage}&search=${search}&limit=${limit}`
      );
    }
  };

  const handleChangePage = (page: number) => {
    router.push(
      `?frontpage=${page || frontpage}&search=${
        search || ''
      }&limit=${limit || ITEMS_ON_PAGE}`
    );
  };

  return (
    <div
      className={`${styles.sidebar} ${
        details ? styles.disabled : ''
      }`}
      onClick={closeDetail}
    >
      <div className="container">
        <div className="wrapper">
          <Select options={selectOptions} />
          <SearchBar />
          <SearchList pokemons={pokemons || []} />
          {(count || 0) > Number(limit || ITEMS_ON_PAGE) && (
            <Pagination
              nPages={getNumberOfPages(
                count,
                Number(limit || ITEMS_ON_PAGE)
              )}
              page={Number(frontpage) || NUM_OF_START_PAGE}
              onChangePage={handleChangePage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
