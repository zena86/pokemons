import { render, screen } from '@testing-library/react';
import SearchList from '../components/searchList';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { SearchContext } from '../context/searchContext';
import { allPokemons } from './data/allPokemons';
import { initialValue } from '../context/init';

describe('SearchList Component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    render(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchContext.Provider
          value={{
            term: '',
            pokemonsPerPage: JSON.parse(allPokemons).pokemons,
          }}
        >
          <SearchList />
        </SearchContext.Provider>
      </MemoryRouter>
    );
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(screen.queryByText('No pokemons found')).not.toBeInTheDocument();
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchContext.Provider value={initialValue}>
          <SearchList />
        </SearchContext.Provider>
      </MemoryRouter>
    );
    expect(screen.queryByRole('list')).toBeNull();
    expect(screen.getByText('No pokemons found')).toBeInTheDocument();
  });
});
