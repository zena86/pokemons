import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { searchList } from './data/searchList';
import SearchList from '@/components/searchList/SearchList';
import { describe, expect } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './data/createMockRouter';

describe('SearchList Component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <SearchList pokemons={searchList} />
      </RouterContext.Provider>
    );

    const items = await screen.findAllByRole('card');
    expect(items).toHaveLength(6);
    expect(screen.queryByText('No pokemons found')).not.toBeInTheDocument();
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <SearchList pokemons={[]} />
      </RouterContext.Provider>
    );
    expect(screen.queryByRole('card')).toBeNull();
    expect(screen.getByText('No pokemons found')).toBeInTheDocument();
  });
});
