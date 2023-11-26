import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonCard from '@/components/pokemonCard/PokemonCard';
import { pokemonDescription } from './data/pokemonDescription';
import { describe, expect } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './data/createMockRouter';
import SearchList from '@/components/searchList/SearchList';
import { searchList } from './data/searchList';

describe('PokemonCard Component', () => {
  test('Ensure that the card component renders the relevant card data', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <PokemonCard pokemon={pokemonDescription} />
      </RouterContext.Provider>
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

  test('Validate that clicking on a card opens a detailed card component', async () => {
    const router = createMockRouter({
      query: {
        frontpage: '1',
        search: '',
        limit: '12',
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <SearchList pokemons={searchList} />
      </RouterContext.Provider>
    );

    const item = (await screen.findByText('venusaur')).closest('a');
    expect(item).toHaveAttribute(
      'href',
      '/?frontpage=1&search=&limit=12&details=venusaur'
    );
  });
});
