import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Search from '@/components/search/Search';
import { useSearchParams } from 'next/navigation';
import Detail from '@/components/detail/Detail';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { wrapper } from '@/redux/store';
import {
  getPokemon,
  getPokemons,
  getRunningQueriesThunk,
} from '@/redux/pokemonsApi';
import { termUpdated } from '@/redux/features/search/searchSlice';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store) => async (context) => {
    console.log(context);
    const { query, resolvedUrl } = context;
    console.log('query!!!!!!!!!!!!', query);

    const state = store.getState();
    const term = state.search.term;
    const itemsPerPage = state.itemsPerPage.itemsPerPage;

    let page;
    //let id;
    if (resolvedUrl === '/') {
      page = 1;
      //id = '';
    } else {
      page = Number(query.frontpage);
      //id = query.id;
    }

    console.log(term, itemsPerPage, page);

    // const pokemons = getPokemons.initiate({
    //   limit: itemsPerPage,
    //   page: page,
    //   search: term,
    // });

    store.dispatch(
      //pokemons
      getPokemons.initiate({
        limit: itemsPerPage,
        page: page,
        search: term,
      })
    );

    //store.dispatch(getPokemon.initiate({ id }));
    const pokemons = await Promise.all(
      store.dispatch(getRunningQueriesThunk())
    );
    return { props: pokemons };
  }
);

function Home(props) {
  console.log('pokemons', props[0].data);
  //console.log('resolvedUrl!!!!!!!!', props.resolvedUrl);
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
              <Detail />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
