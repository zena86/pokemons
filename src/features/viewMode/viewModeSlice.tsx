import { createSlice } from '@reduxjs/toolkit';

export const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState: {
    isOpen: null,
  },
  reducers: {
    isOpenUpdated: (state, action) => {
      const { isOpen } = action.payload;
      state.isOpen = isOpen;
    },
  },
});

export const { isOpenUpdated } = viewModeSlice.actions;

export default viewModeSlice.reducer;
