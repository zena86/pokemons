import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
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

export const { useGetPokemonsQuery, useGetPokemonQuery } = pokemonsApi;
