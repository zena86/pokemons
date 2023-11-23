import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  term:
    typeof window !== 'undefined' ? window.localStorage.getItem('term') : '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  // initialState: {
  //   term: localStorage.getItem('term') ?? '',
  // },
  reducers: {
    termUpdated: (state, action) => {
      const { term } = action.payload;
      state.term = term;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.search.term) {
        return state;
      }
      state.term = action.payload.search.term;
    },
  },
});

export const { termUpdated } = searchSlice.actions;

export default searchSlice.reducer;
