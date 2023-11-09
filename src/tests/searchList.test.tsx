// import createFetchMock from 'vitest-fetch-mock';
// import { vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// // import SearchList from '../components/searchList';
// // import { MemoryRouter } from 'react-router-dom';
// import '@testing-library/jest-dom';
// import { pokemons } from './mockData/pokemons';
// import pockemonJSON from './mockData/pokemon-03.json';
// import { MemoryRouter } from 'react-router-dom';
// // import { useState } from 'react';
// // import { PokemonDescription } from '../components/pokemonCard/types';
// import PokemonCard from '../components/pokemonCard';

// const fetchMocker = createFetchMock(vi);
// fetchMocker.enableMocks();
// vi.mock('react', () => {
//   const ActualReact = vi.importActual('react');
//   return {
//     ...ActualReact,
//     useContext: () => ({ pokemonsPerPage: pokemons }), // what you want to return when useContext get fired goes here
//     memo: vi.fn(),
//     createContext: vi.fn(),
//     //useState: () => [pockemonJSON, vi.fn()],
//     //useState: () => [pockemonJSON],
//     useEffect: vi.fn(),
//   };
// });

// // vi.mock('React.memo', () => {
// //   const ActualMemo = vi.importActual('memo');
// //   return {
// //     ...ActualMemo,
// //   };
// // });

// describe('SearchList Component', () => {
//   beforeEach(() => {
//     fetchMocker.mockResponse(JSON.stringify(pockemonJSON));
//     // useState.mockImplementation(vi.importActual('react').useState);
//   });

//   // test('Verify that the component renders the specified number of cards', async () => {
//   //   render(
//   //     <MemoryRouter initialEntries={['?frontpage=1']}>
//   //       <SearchList />
//   //     </MemoryRouter>
//   //   );

//   //   const items = await screen.findAllByRole('listitem');
//   //   expect(items).toHaveLength(3);
//   //   expect(screen.queryByText('No pokemons found')).not.toBeInTheDocument();
//   // });

//   // test('Check that an appropriate message is displayed if no cards are present', () => {
//   //   render(
//   //     <MemoryRouter initialEntries={['?frontpage=1']}>
//   //       <SearchList />
//   //     </MemoryRouter>
//   //   );
//   //   expect(screen.queryByRole('list')).toBeNull();
//   //   expect(screen.getByText('No pokemons found')).toBeInTheDocument();
//   // });
// });

import { expect, test } from 'vitest';
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
