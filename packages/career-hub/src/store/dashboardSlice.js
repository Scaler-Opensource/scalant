import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PROCESS_COUNTS } from '../utils/constants';

const initialState = {
  processCounts: DEFAULT_PROCESS_COUNTS,
  userProfileData: null,
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
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
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
  setUserProfileData,
  openFilterModal,
  closeFilterModal,
  openJobAlertModal,
  closeJobAlertModal,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
