import { screen } from '@testing-library/react';
import SearchList from '../components/searchList';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import { pokemons } from './data/pokemons';

describe('SearchList Component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchList pokemons={pokemons} />
      </MemoryRouter>,
      {
        preloadedState: {},
      }
    );

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(screen.queryByText('No pokemons found')).not.toBeInTheDocument();
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <SearchList pokemons={[]} />
      </MemoryRouter>,
      {
        preloadedState: {},
      }
    );
    expect(screen.queryByRole('list')).toBeNull();
    expect(screen.getByText('No pokemons found')).toBeInTheDocument();
  });
});
