import { ITEMS_ON_PAGE } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  itemsPerPage:
    typeof window !== 'undefined'
      ? Number(window.localStorage.getItem('perPage'))
      : ITEMS_ON_PAGE,
};

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState: initialState,
  // initialState: {
  //   itemsPerPage: Number(localStorage.getItem('perPage')) || ITEMS_ON_PAGE,
  // },
  reducers: {
    itemsPerPageUpdated: (state, action) => {
      const { itemsPerPage } = action.payload;
      state.itemsPerPage = itemsPerPage;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // if (!action.payload.itemsPerPage.itemsPerPage) {
      //   return state;
      // }
      state.itemsPerPage = action.payload.itemsPerPage.itemsPerPage;
    },
  },
});

export const { itemsPerPageUpdated } = itemsPerPageSlice.actions;

export default itemsPerPageSlice.reducer;
