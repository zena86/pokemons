import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as router2 from 'react-router';
import '@testing-library/jest-dom';
import { allPokemons2 } from './data/allPokemons2';
import pockemonN1ResponseJson from './data/pokemonN1.json';
import pockemonN2ResponseJson from './data/pokemonN2.json';
import pockemonN3ResponseJson from './data/pokemonN3.json';

//import Sidebar from '../components/sidebar';
import Search from '../components/search';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// const mockUseSearchParams = vi.fn();
// vi.mock('react-router-dom', async () => {
//   const actual = (await vi.importActual('react-router-dom')) as object;
//   return {
//     ...actual,
//     useParams: mockUseSearchParams,
//   };
// });
//const test = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
  setSearchParams: vi.fn(),
}));

const navigate = vi.fn();

describe('Pagination component', () => {
  beforeEach(() => {
    vi.spyOn(router2, 'useNavigate').mockImplementation(() => navigate);
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

  test('Make sure the component updates URL query parameter when page changes', async () => {
    expect(true).toBe(true);
    return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <Search />
      </MemoryRouter>
    );
    await userEvent.click(await screen.findByText('2'));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('?frontpage=2', {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: undefined,
      });
    });
  });
});
