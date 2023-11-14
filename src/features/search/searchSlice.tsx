import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    term: localStorage.getItem('term') ?? '',
  },
  reducers: {
    termUpdated: (state, action) => {
      const { term } = action.payload;
      state.term = term;
    },
  },
});

export const { termUpdated } = searchSlice.actions;

export default searchSlice.reducer;
