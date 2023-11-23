import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const loadMainSlice = createSlice({
  name: 'loadMain',
  initialState: {
    isLoading: false,
  },
  reducers: {
    loadingMain: (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // if (!action.payload.loadMain.isLoading) {
      //   return state;
      // }
      state.isLoading = action.payload.loadMain.isLoading;
    },
  },
});

export const { loadingMain } = loadMainSlice.actions;

export default loadMainSlice.reducer;
