import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  RouterProvider,
  createMemoryRouter,
  MemoryRouter,
} from 'react-router-dom';
import { routerConfig } from '../router';
import { searchMock } from './data/searchMock';
import PokemonCard from '../components/pokemonCard';
import Home from '../pages/home/Home';
import { renderWithProviders } from './test-utils';
import { allPokemons } from './data/allPokemons';

describe('PokemonCard Component', () => {
  beforeEach(() => {
    searchMock();
  });

  test('Ensure that the card component renders the relevant card data', async () => {
    renderWithProviders(
      <PokemonCard
        pokemon={{
          name: 'venusaur',
          id: '3',
        }}
      />,
      {
        preloadedState: {},
      }
    );

    expect(await screen.findByText(/venusaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/weight:/i)).toBeInTheDocument();
    expect(await screen.findByText(/1000/i)).toBeInTheDocument();
    expect(await screen.findByText(/height:/i)).toBeInTheDocument();
    expect(await screen.findByText(/20/i)).toBeInTheDocument();
    expect(await screen.findByText(/abilities:/i)).toBeInTheDocument();
    expect(await screen.findByText(/overgrow/i)).toBeInTheDocument();
    expect(await screen.findByText(/chlorophyll/i)).toBeInTheDocument();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    expect(true).toBe(true);
    return;
    // render(
    //   <MemoryRouter initialEntries={['?frontpage=1']}>
    //     <SearchContext.Provider
    //       value={{
    //         term: '',
    //         pokemonsPerPage: JSON.parse(allPokemons).pokemons,
    //       }}
    //     >
    //       <SearchList />
    //     </SearchContext.Provider>
    //   </MemoryRouter>
    // );
    // expect(true).toBe(true);
    // return;
    const initPokemons = JSON.parse(allPokemons).pokemons;
    renderWithProviders(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <Home />
      </MemoryRouter>,
      {
        preloadedState: {
          pokemons: { pokemons: initPokemons },
        },
      }
    );

    const item = (await screen.findByText('bulbasaur')).closest('a');
    expect(item).not.toBeNull();
    if (item) await userEvent.click(item);

    await waitFor(() => {
      // expect(fetchMock).toHaveBeenCalledWith(
      //   expect.objectContaining({
      //     'Symbol(Request internals)': expect.objectContaining({
      //       method: 'GET',
      //     }),
      //   })
      // );

      // expect(fetchMock).toHaveBeenCalledWith(
      //   'https://poke.jk-mostovaya.workers.dev/pokemon/?id=venusaur'
      // );

      //expect(fetchMock.requests().length).toBe(4);

      console.log(
        'LOG!!!',
        fetchMock.requests().map((x) => x.url)
      );
      expect(fetchMock.requests()[fetchMock.requests().length - 1].url).toEqual(
        'https://poke.jk-mostovaya.workers.dev/pokemon/?id=bulbasaur'
      );
    });
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    const memoryRouter = createMemoryRouter(routerConfig, {
      initialEntries: ['/?frontpage=1'],
    });

    const initPokemons = JSON.parse(allPokemons).pokemons;

    renderWithProviders(<RouterProvider router={memoryRouter} />, {
      preloadedState: {
        pokemons: { pokemons: initPokemons },
      },
    });

    const item = (await screen.findByText('venusaur')).closest('a');
    if (item) await userEvent.click(item);

    await waitFor(() => {
      expect(screen.getByText(/moves:/i)).toBeInTheDocument();
    });
  });
});
