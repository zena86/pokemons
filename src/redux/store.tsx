import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import pokemonsReducer from '../features/pokemons/pokemonsSlice';
import viewModeReducer from '../features/viewMode/viewModeSlice';
import loadMainReducer from '../features/loadMain/loadMainSlice';
import loadDetailReducer from '../features/loadDetail/loadDetailSlice';
import { pokemonsApi } from './pokemonsApi';

const store = configureStore({
  reducer: {
    search: searchReducer,
    pokemons: pokemonsReducer,
    [pokemonsApi.reducerPath]: pokemonsApi.reducer,
    loadMain: loadMainReducer,
    loadDetail: loadDetailReducer,
    viewMode: viewModeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
