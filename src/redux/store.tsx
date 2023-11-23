import {
  Action,
  AnyAction,
  PreloadedState,
  Reducer,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import itemsPerPageReducer from './features/itemsPerPage/itemsPerPageSlice';
import loadMainReducer from './features/loadMain/loadMainSlice';
import loadDetailReducer from './features/loadDetail/loadDetailSlice';
import { pokemonsApi } from './pokemonsApi';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  search: searchReducer,
  itemsPerPage: itemsPerPageReducer,
  [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  loadMain: loadMainReducer,
  loadDetail: loadDetailReducer,
});

// const reducer: Reducer = (
//   state: ReturnType<typeof rootReducer>,
//   action: AnyAction
// ) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     return nextState;
//   } else {
//     return rootReducer(state, action);
//   }
// };

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonsApi.middleware),
  });
};

// let store: AppStore;
// export const initialiseStore = (preloadedState?: PreloadedState<RootState>) => {
//   let _store = store ?? setupStore(preloadedState);

//   if (preloadedState && store) {
//     _store = setupStore({ ...store.getState(), ...preloadedState });
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(() => setupStore(), {
  debug: true,
});

export default setupStore;
