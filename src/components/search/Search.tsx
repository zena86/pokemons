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
  const { frontpage, search, limit, details } = router.query;
  const itemsOnPage = Number(limit || ITEMS_ON_PAGE);

  const closeDetail = () => {
    if (details) {
      router.push(`?frontpage=${frontpage}&search=${search}&limit=${limit}`);
    }
  };

  const handleChangePage = (page: number) => {
    router.push(
      `?frontpage=${page}&search=${search || ''}&limit=${itemsOnPage}`
    );
  };

  return (
    <div
      className={`${styles.sidebar} ${details ? styles.disabled : ''}`}
      onClick={closeDetail}
      role="closepanel"
    >
      <div className="container">
        <div className="wrapper">
          <Select options={selectOptions} />
          <SearchBar />
          <SearchList pokemons={pokemons || []} />
          {(count || 0) > itemsOnPage && (
            <Pagination
              nPages={getNumberOfPages(count, itemsOnPage)}
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
