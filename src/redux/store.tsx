import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import pokemonsReducer from '../features/pokemons/pokemonsSlice';
import viewModeReducer from '../features/viewMode/viewModeSlice';
import loadMainReducer from '../features/loadMain/loadMainSlice';
import loadDetailReducer from '../features/loadDetail/loadDetailSlice';
import { pokemonsApi } from './pokemonsApi';

const rootReducer = combineReducers({
  search: searchReducer,
  pokemons: pokemonsReducer,
  [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  loadMain: loadMainReducer,
  loadDetail: loadDetailReducer,
  viewMode: viewModeReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonsApi.middleware),
  });
};

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(pokemonsApi.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof store>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
