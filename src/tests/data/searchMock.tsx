import createFetchMock from 'vitest-fetch-mock';
import { allPokemons } from './allPokemons';
import pockemonN2ResponseJson from './pokemonN2.json';
import pockemonN3ResponseJson from './pokemonN3.json';
import pockemonN1ResponseJson from './pokemonN1.json';
import { vi } from 'vitest';
import { BASE_URL } from '../../constants';

export const searchMock = () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();

  fetchMocker.mockIf(
    (p) => {
      if (p.url.startsWith(`${BASE_URL}pokemons`)) return true;
      if (p.url.startsWith(`${BASE_URL}pokemon/?id=bulbasaur`)) return true;
      if (p.url.startsWith(`${BASE_URL}pokemon/?id=ivysaur`)) return true;
      if (p.url.startsWith(`${BASE_URL}pokemon/?id=venusaur`)) return true;
      return false;
    },
    (req) => {
      if (req.url.startsWith(`${BASE_URL}pokemons`)) {
        return allPokemons;
      } else if (req.url.startsWith(`${BASE_URL}pokemon/?id=bulbasaur`)) {
        return JSON.stringify(pockemonN1ResponseJson);
      } else if (req.url.startsWith(`${BASE_URL}pokemon/?id=ivysaur`)) {
        return JSON.stringify(pockemonN2ResponseJson);
      } else if (req.url.startsWith(`${BASE_URL}pokemon/?id=venusaur`)) {
        return JSON.stringify(pockemonN3ResponseJson);
      }
      return '';
    }
  );
};
