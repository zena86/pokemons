import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WORKER_BASE } from '../services/pokemon';

export const pokemonsApi = createApi({
  reducerPath: 'pokemonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${WORKER_BASE}`,
  }),
  endpoints: (build) => ({
    getPokemonsPerPage: build.query({
      query: (args) => {
        const { limit, page, search } = args;
        return {
          url: `?search=${search}&offset=${(page - 1) * limit}&limit=${limit}`,
        };
      },
    }),
  }),
});

export const { useGetPokemonsPerPageQuery } = pokemonsApi;
