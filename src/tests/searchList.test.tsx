import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { MemoryRouter } from 'react-router-dom';
// import { renderWithProviders } from './test-utils';
// import { pokemons } from './data/pokemons';
import { searchList } from './data/searchList';
import SearchList from '@/components/searchList/SearchList';
import { describe, expect } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './data/createMockRouter';

describe('SearchList Component', () => {
  // vi.mock("next/router", () => {
  //   const actual = vi.importActual("next/router");
  //   return {
  //     ...actual,
  //     useRouter: vi.fn(() => ({
  //       push: vi.fn(),
  //     })),
  //     useSearchParams: vi.fn(() => ({
  //       get: vi.fn(),
  //     })),
  //     usePathname: vi.fn(),
  //   };
  // });

  test('Verify that the component renders the specified number of cards', async () => {
    // renderWithProviders(
    //   <MemoryRouter initialEntries={['?frontpage=1']}>
    //     <SearchList pokemons={pokemons} />
    //   </MemoryRouter>,
    //   {
    //     preloadedState: {},
    //   }
    // );

    // href='?frontpage=1&search=&limit=12'
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <SearchList pokemons={searchList} />
      </RouterContext.Provider>
    );

    const items = await screen.findAllByRole('card');
    expect(items).toHaveLength(6);
    expect(screen.queryByText('No pokemons found')).not.toBeInTheDocument();
  });

  // test('Check that an appropriate message is displayed if no cards are present', () => {
  //   // renderWithProviders(
  //   //   <MemoryRouter initialEntries={['?frontpage=1']}>
  //   //     <SearchList pokemons={[]} />
  //   //   </MemoryRouter>,
  //   //   {
  //   //     preloadedState: {},
  //   //   }
  //   // );

  //   render(<SearchList pokemons={[]} />);
  //   expect(screen.queryByRole('card')).toBeNull();
  //   expect(screen.getByText('No pokemons found')).toBeInTheDocument();
  // });
});
