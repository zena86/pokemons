import createFetchMock from 'vitest-fetch-mock';
import { allPokemons } from './allPokemons';
import pockemonN2ResponseJson from './pokemonN2.json';
import pockemonN3ResponseJson from './pokemonN3.json';
import pockemonN1ResponseJson from './pokemonN1.json';
import { vi } from 'vitest';

export const searchMock = () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();

  fetchMocker.mockIf(
    (p) => {
      if (p.url.startsWith('https://pokemons-2.jk-mostovaya.workers.dev'))
        return true;
      if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/1')) return true;
      if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/2')) return true;
      if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/3')) return true;
      if (p.url.startsWith('https://pokeapi.co/api/v2/pokemon/venusaur'))
        return true;
      return false;
    },
    (req) => {
      if (req.url.startsWith('https://pokemons-2.jk-mostovaya.workers.dev')) {
        return allPokemons;
      } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/1')) {
        return JSON.stringify(pockemonN1ResponseJson);
      } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/2')) {
        return JSON.stringify(pockemonN2ResponseJson);
      } else if (req.url.startsWith('https://pokeapi.co/api/v2/pokemon/3')) {
        return JSON.stringify(pockemonN3ResponseJson);
      } else if (
        req.url.startsWith('https://pokeapi.co/api/v2/pokemon/venusaur')
      ) {
        return JSON.stringify(pockemonN3ResponseJson);
      }
      return '';
    }
  );
};
