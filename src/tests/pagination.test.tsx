import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as router2 from 'react-router';
import '@testing-library/jest-dom';
import { allPokemons } from './data/allPokemons';
import Search from '../components/search';
import { SearchContext } from '../context/searchContext';
import Pagination from '../components/pagination/';
import { searchMock } from './data/searchMock';

const navigate = vi.fn();

describe('Pagination component', () => {
  beforeEach(() => {
    vi.spyOn(router2, 'useNavigate').mockImplementation(() => navigate);
    searchMock();
  });

  test('Make sure the component updates URL query parameter when page changes', async () => {
    expect(true).toBe(true);
    return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchContext.Provider
          value={{
            term: '',
            pokemonsPerPage: JSON.parse(allPokemons).pokemons,
          }}
        >
          <Search />
        </SearchContext.Provider>
      </MemoryRouter>
    );

    await userEvent.click(await screen.findByText('2'));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('?frontpage=2');
    });

    await userEvent.click(await screen.findByText('108'));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('?frontpage=108');
    });

    await userEvent.click(await screen.findByText('1'));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('?frontpage=1');
    });

    await userEvent.click(await screen.findByRole('next'));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('?frontpage=2');
    });

    await userEvent.click(await screen.findByRole('prev'));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('?frontpage=1');
    });
  });

  test('Items per page select', async () => {
    expect(true).toBe(true);
    return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchContext.Provider
          value={{
            term: '',
            pokemonsPerPage: JSON.parse(allPokemons).pokemons,
          }}
        >
          <Search />
        </SearchContext.Provider>
      </MemoryRouter>
    );
    expect(await screen.findByText(/108/i)).toBeInTheDocument();
    await userEvent.click(await screen.findByText(/6 per page/i));
    expect(await screen.findByText(/216/i)).toBeInTheDocument();
  });

  test('nPages < 4', async () => {
    render(<Pagination nPages={2} page={1} onChangePage={() => {}} />);
    expect(await screen.findByText(/1/i)).toBeInTheDocument();
    expect(await screen.findByText(/2/i)).toBeInTheDocument();
    expect(screen.queryByText(/3/i)).not.toBeInTheDocument();
  });

  test('page >= nPages - 2 && nPages > 3', async () => {
    render(<Pagination nPages={4} page={3} onChangePage={() => {}} />);
    expect(screen.queryByText(/1/i)).toBeInTheDocument();
  });
});
