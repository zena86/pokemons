import { screen } from '@testing-library/react';
import SearchList from '../components/searchList';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import { allPokemons } from './data/allPokemons';

describe('SearchList Component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    const initPokemons = JSON.parse(allPokemons).pokemons;

    renderWithProviders(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchList />
      </MemoryRouter>,
      {
        preloadedState: {
          pokemons: { pokemons: initPokemons },
        },
      }
    );

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(screen.queryByText('No pokemons found')).not.toBeInTheDocument();
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchList />
      </MemoryRouter>,
      {
        preloadedState: {
          pokemons: { pokemons: [] },
        },
      }
    );
    expect(screen.queryByRole('list')).toBeNull();
    expect(screen.getByText('No pokemons found')).toBeInTheDocument();
  });
});
