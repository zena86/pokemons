// import { createSlice } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';

// export const loadDetailSlice = createSlice({
//   name: 'loadDetail',
//   initialState: {
//     isLoading: false,
//   },
//   reducers: {
//     loadingDetail: (state, action) => {
//       const { isLoading } = action.payload;
//       state.isLoading = isLoading;
//     },
//   },
//   extraReducers: {
//     [HYDRATE]: (state, action) => {
//       // if (!action.payload.loadDetail.isLoading) {
//       //   return state;
//       // }
//       state.isLoading = action.payload.loadDetail.isLoading;
//     },
//   },
// });

// export const { loadingDetail } = loadDetailSlice.actions;

// export default loadDetailSlice.reducer;
