import { createSlice } from '@reduxjs/toolkit';
import { ITEMS_ON_PAGE } from '../../constants';

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState: {
    itemsPerPage: Number(localStorage.getItem('perPage')) || ITEMS_ON_PAGE,
  },
  reducers: {
    itemsPerPageUpdated: (state, action) => {
      const { itemsPerPage } = action.payload;
      state.itemsPerPage = itemsPerPage;
    },
  },
});

export const { itemsPerPageUpdated } = itemsPerPageSlice.actions;

export default itemsPerPageSlice.reducer;
