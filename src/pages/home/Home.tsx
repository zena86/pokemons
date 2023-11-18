import { Outlet, ScrollRestoration, useSearchParams } from 'react-router-dom';
import Search from '../../components/search/Search';
import styles from './style.module.scss';

const Home = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.body}>
      <Search />
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
