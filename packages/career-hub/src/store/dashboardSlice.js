import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  processCounts: {
    all: 0,
    relevant: 0,
    draft: 0,
    applications: 0,
    saved: 0,
    archived: 0,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setProcessCounts: (state, action) => {
      state.processCounts = action.payload;
    },
  },
});

export const { setProcessCounts } = dashboardSlice.actions;
export default dashboardSlice.reducer;

