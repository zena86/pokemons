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
import SearchList from '../components/searchList/SearchList';
import { renderWithProviders } from './test-utils';
import { pokemons } from './data/pokemons';

describe('PokemonCard Component', () => {
  beforeEach(() => {
    searchMock();
  });

  test('Ensure that the card component renders the relevant card data', async () => {
    // expect(true).toBe(true);
    // return;
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
    renderWithProviders(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchList pokemons={pokemons} />
      </MemoryRouter>,
      {
        preloadedState: {},
      }
    );

    const item = (await screen.findByText('venusaur')).closest('a');
    expect(item).not.toBeNull();
    if (item) await userEvent.click(item);

    const requests = fetchMock.requests();

    await waitFor(() => {
      expect(requests[requests.length - 1].url).toEqual(
        'https://poke.jk-mostovaya.workers.dev/pokemon/?id=venusaur'
      );
    });
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    const memoryRouter = createMemoryRouter(routerConfig, {
      initialEntries: ['/?frontpage=1'],
    });

    renderWithProviders(<RouterProvider router={memoryRouter} />, {
      preloadedState: {},
    });

    const item = (await screen.findByText('venusaur')).closest('a');
    if (item) await userEvent.click(item);

    await waitFor(() => {
      expect(screen.getByText(/moves:/i)).toBeInTheDocument();
    });
  });
});
