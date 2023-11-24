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
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE } from '@/constants';
import { Resp } from '@/redux/types';
import { PokemonsResponse } from '@/redux/types';
import Message from '@/components/message/Message';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    store.dispatch(
      getDetailedPokemons.initiate({
        limit: Number(query.limit) || ITEMS_ON_PAGE,
        page: Number(query.frontpage) || NUM_OF_START_PAGE,
        search: (query.search as string) || '',
      })
    );

    const pokemons = await Promise.all(
      store.dispatch(getRunningQueriesThunk())
    );

    return { props: pokemons };
  });

function Home(props: Resp[]) {
  const searchParams = useSearchParams();
  console.log('errrrrrrrrrrrrrrrrrror', props[0].error?.error);

  if (!props[0].data) return;
  const pokemonsResponse = props[0].data as PokemonsResponse;

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
          {props[0].isError && props[0].error?.error && (
            <Message errorMessage={props[0].error?.error} />
          )}
          <Search pokemonsRequest={pokemonsResponse} />
          {searchParams.get('details') && (
            <div className={styles.details}>
              <Detail pokemonsRequest={pokemonsResponse} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
