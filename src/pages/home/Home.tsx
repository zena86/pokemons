import { Outlet, ScrollRestoration, useSearchParams } from 'react-router-dom';
import Search from '../../components/search/Search';
import styles from './style.module.scss';
// import {
//   SearchContext,
//   SearchDispatchContext,
// } from '../../context/searchContext';
// import { useReducer } from 'react';
// import { searchReducer } from '../../context/reducer';
// import { initialValue } from '../../context/init';

const Home = () => {
  const [searchParams] = useSearchParams();
  //const [state, dispatch] = useReducer(searchReducer, initialValue);

  return (
    <div className={styles.body}>
      {/* <SearchContext.Provider value={state}>
        <SearchDispatchContext.Provider value={dispatch}> */}
      <Search />
      {/* </SearchDispatchContext.Provider>
      </SearchContext.Provider> */}
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
