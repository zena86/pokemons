import { createSlice } from '@reduxjs/toolkit';

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemonsList: [],
  },
  reducers: {
    pokemonsUpdated: (state, action) => {
      const { pokemons } = action.payload;
      state.pokemonsList = pokemons;
    },
  },
});

export const { pokemonsUpdated } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
