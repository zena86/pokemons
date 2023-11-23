import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { Pokemon } from '@/components/searchList/types';
import { PokemonDescription } from '@/components/pokemonCard/types';

export interface PokemonsResponse {
  count: number;
  pokemons: Pokemon[];
}

export interface DetailedPokemonsResponse {
  count: number;
  pokemons: PokemonDescription[];
  //error?: FetchBaseQueryError;
}

// export const pokemonsApi = createApi({
//   reducerPath: 'pokemonsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${BASE_URL}`,
//   }),
//   extractRehydrationInfo(action, { reducerPath }) {
//     if (action.type === HYDRATE) {
//       return action.payload[reducerPath];
//     }
//   },
//   keepUnusedDataFor: 120,
//   endpoints: (build) => ({
//     getPokemons: build.query({
//       query: (args) => {
//         const { limit, page, search } = args;
//         return {
//           url: `pokemons/?search=${search}&offset=${
//             (page - 1) * limit
//           }&limit=${limit}`,
//         };
//       },
//     }),

//     getPokemon: build.query({
//       query: (id) => `pokemon/?id=${id}`,
//     }),

//     getDetailedPokemons: build.query<DetailedPokemonsResponse, void>({
//       queryFn: async (_arg, _api, _extraOptions, _baseQuery, fetchWithBQ): MaybePromise<any> => {
//         //const { limit, page, search } = args;
//         const limit = 10;
//         const page = 10;
//         const search = 'wer';
//         const pokemons = await fetchWithBQ(
//           `pokemons/?search=${search}&offset=${
//             (page - 1) * limit
//           }&limit=${limit}`
//         );
//         if (pokemons.error)
//           return { error: pokemons.error as FetchBaseQueryError };

//         const pokemonsData = pokemons.data as PokemonsResponse;

//         const detailedPokemons = await pokemonsData.pokemons.map(
//           async (pokemon) => await fetchWithBQ(`pokemon/?id=${pokemon.id}`)
//         );

//         //return { error: undefined };
//         return {
//           count: pokemonsData.count,
//           pokemons: [], //detailedPokemons,
//         };
//       },
//     }),
//   }),
// });

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
        ).map((r) => r.data);

        // const detailedPokemons = [];
        // for (let i = 0; i < pokemonsData.pokemons.length; i++) {
        //   const pokemon = pokemonsData.pokemons[i];
        //   const pokemonDetails = await fetchWithBQ(`pokemon/?id=${pokemon.id}`);
        //   detailedPokemons.push(pokemonDetails.data);
        // }

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

// export const {
//   useGetPokemonsQuery,
//   useGetPokemonQuery,
//   util: { getRunningQueriesThunk },
// } = pokemonsApi;

// export const { getPokemons, getPokemon, getDetailedPokemons } =
//   pokemonsApi.endpoints;
