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
  filterModalOpen: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setProcessCounts: (state, action) => {
      state.processCounts = action.payload;
    },
    openFilterModal: (state) => {
      state.filterModalOpen = true;
    },
    closeFilterModal: (state) => {
      state.filterModalOpen = false;
    },
  },
});

export const { setProcessCounts, openFilterModal, closeFilterModal } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
