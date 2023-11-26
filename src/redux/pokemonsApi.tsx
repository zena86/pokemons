import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { PokemonsResponse } from './types';

export const pokemonsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (build) => ({
    getDetailedPokemons: build.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const { limit, page, search } = _arg;
        const pokemons = await fetchWithBQ(
          `pokemons/?search=${search}&offset=${
            (page - 1) * limit
          }&limit=${limit}`
        );
        if (pokemons.error)
          return { error: pokemons.error as FetchBaseQueryError };

        const pokemonsData = pokemons.data as PokemonsResponse;

        const detailedPokemonsPromises = pokemonsData.pokemons.map(
          (pokemon) => {
            return fetchWithBQ(`pokemon/?id=${pokemon.id}`);
          }
        );

        const detailedPokemons = (
          await Promise.all(detailedPokemonsPromises)
        ).map((response) => response.data);

        return {
          data: {
            count: pokemonsData.count,
            pokemons: detailedPokemons,
          },
        };
      },
    }),
  }),
});

export const {
  useGetDetailedPokemonsQuery,
  util: { getRunningQueriesThunk },
} = pokemonsApi;

export const { getDetailedPokemons } = pokemonsApi.endpoints;
