import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Search from '@/components/search/Search';
import { useSearchParams } from 'next/navigation';
import Detail from '@/components/detail/Detail';
import { wrapper } from '@/redux/store';
import {
  getDetailedPokemons,
  getRunningQueriesThunk,
} from '@/redux/pokemonsApi';

import type { GetServerSideProps } from 'next';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (store) => async (context) => {
      const { query, resolvedUrl } = context;

      let page = null;
      let search = '';
      let limit;
      if (resolvedUrl === '/') {
        page = 1;
        search = '';
        limit = 12;
      } else {
        page = Number(query.frontpage);
        search = query.search as string;
        limit = Number(query.limit);
      }

      // store.dispatch(
      //   getPokemons.initiate({
      //     limit: limit,
      //     page: page,
      //     search: search,
      //   })
      // );

      // const pokemons = await Promise.all(
      //   store.dispatch(getRunningQueriesThunk())
      // );

      store.dispatch(
        getDetailedPokemons.initiate({
          limit: limit,
          page: page,
          search: search,
        })
      );

      const pokemons = await Promise.all(
        store.dispatch(getRunningQueriesThunk())
      );

      return { props: pokemons };
    }
  );

function Home(props) {
  const searchParams = useSearchParams();

  return (
    <>
      <Head>
        <title>Pokemons</title>
        <meta name="description" content="App for pokemons search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <div className={styles.body}>
          {/* <h1>{props.resolvedUrl}</h1> */}
          <Search pokemonsRequest={props[0].data} />
          {searchParams.get('details') && (
            <div className={styles.details}>
              <Detail pokemonsRequest={props[0].data} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
