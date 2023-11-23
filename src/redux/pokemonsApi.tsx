import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { BASE_URL } from '../constants';

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  keepUnusedDataFor: 120,
  endpoints: (build) => ({
    getPokemons: build.query({
      query: (args) => {
        const { limit, page, search } = args;
        return {
          url: `pokemons/?search=${search}&offset=${
            (page - 1) * limit
          }&limit=${limit}`,
        };
      },
    }),

    getPokemon: build.query({
      query: (id) => `pokemon/?id=${id}`,
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonQuery,
  util: { getRunningQueriesThunk },
} = pokemonsApi;

export const { getPokemons, getPokemon } = pokemonsApi.endpoints;
