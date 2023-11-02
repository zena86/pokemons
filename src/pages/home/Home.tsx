import { Outlet, ScrollRestoration, useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import styles from './style.module.scss';

const Home = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.body}>
      <Sidebar />
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
