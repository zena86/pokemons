import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PokemonCard from '../components/pokemonCard/PokemonCard';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import SearchList from '../components/searchList';
import { SearchContext } from '../context/searchContext';
import { allPokemons2 } from './data/allPokemons2';
import { routerConfig } from '../router';
import pockemonN2ResponseJson from './data/pokemonN2.json';
import pockemonN3ResponseJson from './data/pokemonN3.json';
import pockemonN1ResponseJson from './data/pokemonN1.json';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// vi.mock('react', () => {
//   const ActualRouter = vi.importActual('react-router-dom');
//   return {
//     ...ActualRouter,
//     useScrollRestoration: vi.fn(),
//     //useContext: () => ({ pokemonsPerPage: pokemons }), // what you want to return when useContext get fired goes here
//     //memo: vi.fn(),
//     // createContext: vi.fn(),
//     //useState: () => [pockemonJSON, vi.fn()],
//     //useState: () => [pockemonJSON],
//     //useEffect: vi.fn(),
//   };
// });

describe('PokemonCard Component', () => {
  beforeEach(() => {
    fetchMocker.mockIf(
      (p) => {
        if (p.url.startsWith('https://pokemons-2.jk-mostovaya.workers.dev'))
          return true;
        if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/1'))
          return true;
        if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/2'))
          return true;
        if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/3'))
          return true;
        if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/venusaur'))
          return true;
        return false;
      },
      (req) => {
        if (req.url.startsWith('https://pokemons-2.jk-mostovaya.workers.dev')) {
          return allPokemons2;
        } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/1')) {
          return JSON.stringify(pockemonN1ResponseJson);
        } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/2')) {
          return JSON.stringify(pockemonN2ResponseJson);
        } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/3')) {
          return JSON.stringify(pockemonN3ResponseJson);
        } else if (
          req.url.startsWith('https://pokeapi.co/api/v2/pokemon/venusaur')
        ) {
          return JSON.stringify(pockemonN3ResponseJson);
        }
        return '';
      }
    );
    //fetchMocker.mockResponse(JSON.stringify(pockemonJSON));
    // fetchMocker.mockIf(
    //   (p) => {
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon?limit'))
    //       return true;
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/1'))
    //       return true;
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/2'))
    //       return true;
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/3'))
    //       return true;
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/venusaur'))
    //       return true;
    //     return false;
    //   },
    //   (req) => {
    //     if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon?limit')) {
    //       return allPokemons;
    //     } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/1')) {
    //       return JSON.stringify(pockemonN1ResponseJson);
    //     } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/2')) {
    //       return JSON.stringify(pockemonN2ResponseJson);
    //     } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/3')) {
    //       return JSON.stringify(pockemonN3ResponseJson);
    //     } else if (
    //       req.url.startsWith('https://pokeapi.co/api/v2/pokemon/venusaur')
    //     ) {
    //       return JSON.stringify(pockemonN3ResponseJson);
    //     }
    //     return '';
    //   }
    // );
  });

  test('Ensure that the card component renders the relevant card data', async () => {
    // expect(true).toBe(true);
    // return;
    render(
      <PokemonCard
        pokemon={{
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon/3/',
        }}
      />
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
    // expect(true).toBe(true);
    // return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchContext.Provider
          value={{
            term: '',
            pokemonsPerPage: JSON.parse(allPokemons2).pokemons,
          }}
        >
          <SearchList />
        </SearchContext.Provider>
      </MemoryRouter>
    );

    const item = (await screen.findByText('venusaur')).closest('a');
    if (item) await userEvent.click(item);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/3/'
      );
    });
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    // expect(true).toBe(true);
    // return;
    const memoryRouter = createMemoryRouter(routerConfig, {
      initialEntries: ['/?frontpage=1'],
    });
    render(<RouterProvider router={memoryRouter} />);
    const item = (await screen.findByText('venusaur')).closest('a');
    if (item) await userEvent.click(item);

    await waitFor(() => {
      expect(screen.getByText(/moves:/i)).toBeInTheDocument();
    });
  });
});
