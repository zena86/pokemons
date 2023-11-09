import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
// import { SearchContext } from '../context/searchContext';
//import Home from '../pages/home';
import Search from '../components/search/Search';
// import { allPokemons } from './data/allPokemons';
// import pockemonN2ResponseJson from './data/pokemonN2.json';
// import pockemonJSON from './mockData/pokemon-03.json';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Search Component', () => {
  beforeEach(() => {
    // fetchMocker.mockIf(
    //   (p) => {
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon?limit'))
    //       return true;
    //     if (p.url === 'https://pokeapi.co/api/v2/pokemon/2/') return true;
    //     if (p.url === 'https://pokeapi.co/api/v2/pokemon/3/') return true;
    //     return false;
    //   },
    //   (req) => {
    //     if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon?limit')) {
    //       return allPokemons;
    //     } else if (req.url === 'https://pokeapi.co/api/v2/pokemon/2/') {
    //       return JSON.stringify(pockemonJSON);
    //     } else if (req.url === 'https://pokeapi.co/api/v2/pokemon/3/') {
    //       return JSON.stringify(pockemonJSON);
    //     }
    //     return '';
    //   }
    // );
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <Search />
      </MemoryRouter>
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

  // test('Check that the component retrieves the value from the local storage upon mounting', async () => {
  //   // expect(true).toBe(true);
  //   // return;

  //   // let term = '';
  //   // const setTerm = (val: string) => {
  //   //   term = val;
  //   // };

  //   localStorage.setItem('term', 'v');

  //   render(
  //     <MemoryRouter initialEntries={['?frontpage=1']}>
  //       <Search />
  //     </MemoryRouter>
  //   );

  //   expect(await screen.findByText(/venusaur/i)).toBeInTheDocument();
  //   expect(await screen.findByText(/ivysaur/i)).toBeInTheDocument();
  // });
});
