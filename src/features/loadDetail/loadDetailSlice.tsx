import { createSlice } from '@reduxjs/toolkit';

export const loadDetailSlice = createSlice({
  name: 'loadDetail',
  initialState: {
    isLoading: false,
  },
  reducers: {
    loadingDetail: (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    },
  },
});

export const { loadingDetail } = loadDetailSlice.actions;

export default loadDetailSlice.reducer;
