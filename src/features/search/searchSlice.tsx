import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    term: '',
  },
  reducers: {
    testreducer: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.term = 'test term';
    },
  },
});

// Action creators are generated for each case reducer function
export const { testreducer } = searchSlice.actions;

export default searchSlice.reducer;
