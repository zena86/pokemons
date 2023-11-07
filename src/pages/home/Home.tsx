import { Outlet, ScrollRestoration, useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import styles from './style.module.scss';
import {
  SearchContext,
  SearchDispatchContext,
} from '../../context/searchContext';
import { useReducer } from 'react';
import { searchReducer } from '../../context/reducer';
import { initialValue } from '../../context/constants';

const Home = () => {
  const [searchParams] = useSearchParams();

  const [term, dispatch] = useReducer(searchReducer, initialValue);

  return (
    <div className={styles.body}>
      <SearchContext.Provider value={term}>
        <SearchDispatchContext.Provider value={dispatch}>
          <Sidebar />
        </SearchDispatchContext.Provider>
      </SearchContext.Provider>
      {searchParams.get('details') && (
        <div className={styles.details}>
          <Outlet />
        </div>
      )}
      <ScrollRestoration />
    </div>
  );
};

export default Home;
