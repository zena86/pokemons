import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import pokemonsReducer from '../features/pokemons/pokemonsSlice';
import { pokemonsApi } from './pokemonsApi';

const store = configureStore({
  reducer: {
    search: searchReducer,
    pokemons: pokemonsReducer,
    [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
