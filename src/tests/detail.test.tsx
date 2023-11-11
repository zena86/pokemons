import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import Detail from '../components/detail';
import { allPokemons2 } from './data/allPokemons2';
import pockemonN2ResponseJson from './data/pokemonN2.json';
import pockemonN3ResponseJson from './data/pokemonN3.json';
import pockemonN1ResponseJson from './data/pokemonN1.json';
import { routerConfig } from '../router';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// vi.mock('react', () => {
//   const ActualRouter = vi.importActual('react-router-dom');
//   return {
//     ...ActualRouter,
//     useScrollRestoration: vi.fn(),
//     //useContext: () => ({ pokemonsPerPage: pokemons }), // what you want to return when useContext get fired goes here
//     memo: vi.fn(),
//     createContext: vi.fn(),
//     //useState: () => [pockemonJSON, vi.fn()],
//     //useState: () => [pockemonJSON],
//     //useEffect: vi.fn(),
//   };
// });

describe('Detail Component', () => {
  beforeEach(() => {
    // fetchMocker.mockResponse(JSON.stringify(pockemonJSON));
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
  });

  test('Check that a loading indicator is displayed while fetching data', async () => {
    // expect(true).toBe(true);
    // return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1&details=venusaur']}>
        <Detail />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    // expect(true).toBe(true);
    // return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1&details=venusaur']}>
        <Detail />
      </MemoryRouter>
    );
    expect(await screen.findByText(/venusaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/weight:/i)).toBeInTheDocument();
    expect(await screen.findByText(/1000/i)).toBeInTheDocument();
    expect(await screen.findByText(/height:/i)).toBeInTheDocument();
    expect(await screen.findByText(/20/i)).toBeInTheDocument();
    expect(await screen.findByText(/abilities:/i)).toBeInTheDocument();
    expect(await screen.findByText(/overgrow/i)).toBeInTheDocument();
    expect(await screen.findByText(/chlorophyll/i)).toBeInTheDocument();
    expect(await screen.findByText(/swords-dance/i)).toBeInTheDocument();
    expect(await screen.findByText(/sprites/i)).toBeInTheDocument();
    expect(await screen.findByText(/moves/i)).toBeInTheDocument();
    expect(await screen.findByRole('button')).toBeInTheDocument();
  });

  test('without query params', async () => {
    // expect(true).toBe(true);
    // return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <Detail />
      </MemoryRouter>
    );
    expect(screen.queryByText(/moves/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    // expect(true).toBe(true);
    // return;
    const memoryRouter = createMemoryRouter(routerConfig, {
      initialEntries: ['/?frontpage=1&details=venusaur'],
    });
    const { container } = render(<RouterProvider router={memoryRouter} />);
    expect(await screen.findByText(/moves:/i)).toBeInTheDocument();
    // const closeBtn = await screen.findByRole('button', { name: 'close' });
    const closeBtn = container.querySelector('button[name=close]');
    if (closeBtn) await userEvent.click(closeBtn);
    expect(screen.queryByText(/moves/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'close' })
    ).not.toBeInTheDocument();
  });
});
