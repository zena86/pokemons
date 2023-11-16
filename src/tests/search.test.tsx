import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Search from '../components/search/Search';
import { renderWithProviders } from './test-utils';

describe('Search Component', () => {
  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <Search />
      </MemoryRouter>,
      {
        preloadedState: {
          pokemons: { pokemons: [] },
        },
      }
    );

    const searchBtn = screen.getByRole('button', { name: /search/i });
    const textboxEl = screen.getByRole('textbox');

    await userEvent.type(textboxEl, 'pok');
    await userEvent.click(searchBtn);

    await waitFor(() => {
      const currentTerm = localStorage.getItem('term') || '';
      expect(currentTerm).toBe('pok');
    });
  });

  test('Check that the component retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem('term', 'bul');

    renderWithProviders(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <Search />
      </MemoryRouter>,
      {
        preloadedState: {
          pokemons: { pokemons: [] },
          search: { term: localStorage.getItem('term') ?? '' },
        },
      }
    );

    expect(await screen.findByRole('textbox')).toHaveValue('bul');
  });
});
