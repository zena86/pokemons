import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import itemsPerPageReducer from '../features/itemsPerPage/itemsPerPageSlice';
import loadMainReducer from '../features/loadMain/loadMainSlice';
import loadDetailReducer from '../features/loadDetail/loadDetailSlice';
import { pokemonsApi } from './pokemonsApi';

const rootReducer = combineReducers({
  search: searchReducer,
  itemsPerPage: itemsPerPageReducer,
  [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  loadMain: loadMainReducer,
  loadDetail: loadDetailReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
