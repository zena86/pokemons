import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
// import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
//import Item from '../components/item';
// import pockemonN1ResponseJson from './data/pokemonN1.json';
// import pockemonN2ResponseJson from './data/pokemonN2.json';
// import pockemonN3ResponseJson from './data/pokemonN3.json';
// import { allPokemons } from './data/allPokemons';
//import App from '../App';
//import Detail from '../components/detail';
import PokemonCard from '../components/pokemonCard/PokemonCard';
import pockemonJSON from './mockData/pokemon-03.json';
import Detail from '../components/detail/Detail';
//import App from '../App';
//import { pokemons } from './mockData/pokemons';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// vi.mock('react', () => {
//   const ActualReact = vi.importActual('react');
//   return {
//     ...ActualReact,
//     useContext: () => ({ pokemonsPerPage: pokemons }), // what you want to return when useContext get fired goes here
//     memo: vi.fn(),
//     createContext: vi.fn(),
//     //useState: () => [pockemonJSON, vi.fn()],
//     //useState: () => [pockemonJSON],
//     //useEffect: vi.fn(),
//   };
// });

describe('PokemonCard Component', () => {
  beforeEach(() => {
    fetchMocker.mockResponse(JSON.stringify(pockemonJSON));
    // fetchMocker.mockIf(
    //   (p) => {
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon?limit'))
    //       return true;
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/1'))
    //       return true;
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/2'))
    //       return true;
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/3'))
    //       return true;
    //     if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/venusaur'))
    //       return true;
    //     return false;
    //   },
    //   (req) => {
    //     if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon?limit')) {
    //       return allPokemons;
    //     } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/1')) {
    //       return JSON.stringify(pockemonN1ResponseJson);
    //     } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/2')) {
    //       return JSON.stringify(pockemonN2ResponseJson);
    //     } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/3')) {
    //       return JSON.stringify(pockemonN3ResponseJson);
    //     } else if (
    //       req.url.startsWith('https://pokeapi.co/api/v2/pokemon/venusaur')
    //     ) {
    //       return JSON.stringify(pockemonN3ResponseJson);
    //     }
    //     return '';
    //   }
    // );
  });

  test('Ensure that the card component renders the relevant card data', async () => {
    render(<PokemonCard pokemon={pockemonJSON} />);
    expect(await screen.findByText(/venusaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/weight:/i)).toBeInTheDocument();
    expect(await screen.findByText(/1000/i)).toBeInTheDocument();
    expect(await screen.findByText(/height:/i)).toBeInTheDocument();
    expect(await screen.findByText(/20/i)).toBeInTheDocument();
    expect(await screen.findByText(/abilities:/i)).toBeInTheDocument();
    expect(await screen.findByText(/overgrow/i)).toBeInTheDocument();
    expect(await screen.findByText(/chlorophyll/i)).toBeInTheDocument();
  });

  // test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
  //   render(<App />);
  //   const item = (await screen.findByText('venusaur')).closest('a');
  //   // if (item) await userEvent.click(item);
  //   screen.debug();
  //   await waitFor(() => {
  //     expect(fetchMock).toHaveBeenCalledWith(
  //       'https://pokeapi.co/api/v2/pokemon/venusaur'
  //     );
  //   });
  // });

  test('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['?frontpage=1&details=venusaur']}>
        <Detail />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });
  });
});
