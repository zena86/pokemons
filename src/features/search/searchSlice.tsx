import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    term: '',
  },
  reducers: {
    termUpdated: (state, action) => {
      const { term } = action.payload;
      state.term = term;
    },
  },
});

// Action creators are generated for each case reducer function
export const { termUpdated } = searchSlice.actions;

export default searchSlice.reducer;
