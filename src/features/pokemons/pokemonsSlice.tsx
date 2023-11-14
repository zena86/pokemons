import { createSlice } from '@reduxjs/toolkit';

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemons: [],
  },
  reducers: {
    pokemonsUpdated: (state, action) => {
      const { pokemons } = action.payload;
      state.pokemons = pokemons;
    },
  },
});

export const { pokemonsUpdated } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
