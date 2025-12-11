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
  jobAlertModalOpen: false,
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
    openJobAlertModal: (state) => {
      state.jobAlertModalOpen = true;
    },
    closeJobAlertModal: (state) => {
      state.jobAlertModalOpen = false;
    },
  },
});

export const {
  setProcessCounts,
  openFilterModal,
  closeFilterModal,
  openJobAlertModal,
  closeJobAlertModal,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
