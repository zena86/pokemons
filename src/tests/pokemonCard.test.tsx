import { screen, render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
// import {
//   RouterProvider,
//   createMemoryRouter,
//   MemoryRouter,
// } from 'react-router-dom';
// import { routerConfig } from '../router';
import { searchMock } from './data/searchMock';
import SearchList from '../components/searchList/SearchList';
// import { renderWithProviders } from './test-utils';
// import { pokemons } from './data/pokemons';
import PokemonCard from '@/components/pokemonCard/PokemonCard';
import { pokemonDescription } from './data/pokemonDescription';
import Home from '@/pages';
import { apiResponse } from './data/apiResponse';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('PokemonCard Component', () => {
  vi.mock("next/navigation", () => {
    const actual = vi.importActual("next/navigation");
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        push: vi.fn(),
      })),
      useSearchParams: vi.fn(() => ({
        get: vi.fn(),
      })),
      usePathname: vi.fn(),
    };
  });
  // beforeEach(() => {
  //   searchMock();
  // });

  test('Ensure that the card component renders the relevant card data', async () => {
    // renderWithProviders(
    //   <PokemonCard
    //     pokemon={{
    //       name: 'venusaur',
    //       id: '3',
    //     }}
    //   />,
    //   {
    //     preloadedState: {},
    //   }
    // );

    render(<PokemonCard pokemon={pokemonDescription} />);

    expect(await screen.findByText(/venusaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/weight:/i)).toBeInTheDocument();
    expect(await screen.findByText(/1000/i)).toBeInTheDocument();
    expect(await screen.findByText(/height:/i)).toBeInTheDocument();
    expect(await screen.findByText(/20/i)).toBeInTheDocument();
    expect(await screen.findByText(/abilities:/i)).toBeInTheDocument();
    expect(await screen.findByText(/overgrow/i)).toBeInTheDocument();
    expect(await screen.findByText(/chlorophyll/i)).toBeInTheDocument();
  });

  // test('Validate that clicking on a card opens a detailed card component', async () => {
  //   // const memoryRouter = createMemoryRouter(routerConfig, {
  //   //   initialEntries: ['/?frontpage=1'],
  //   // });

  //   // renderWithProviders(<RouterProvider router={memoryRouter} />, {
  //   //   preloadedState: {},
  //   // });

  //   render(<Home props={apiResponse} />);

  //   const item = (await screen.findByText('venusaur')).closest('a');
  //   if (item) await userEvent.click(item);

  //   await waitFor(() => {
  //     expect(screen.getByText(/moves:/i)).toBeInTheDocument();
  //   });
  // });
});
