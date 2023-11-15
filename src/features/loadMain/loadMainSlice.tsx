import { createSlice } from '@reduxjs/toolkit';

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
});

export const { loadingMain } = loadMainSlice.actions;

export default loadMainSlice.reducer;
