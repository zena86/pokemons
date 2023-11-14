import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import pokemonsReducer from './features/pokemons/pokemonsSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    pokemons: pokemonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
