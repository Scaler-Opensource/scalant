// Career Hub Main Slice
// LLD: Manages core Career Hub state: current tab, active job, initialization status
// This is the main slice that coordinates the overall Career Hub state

import { createSlice } from '@reduxjs/toolkit';
import { NAVIGATION_TABS } from '../utils/constants';

const initialState = {
  currentTab: NAVIGATION_TABS.HOME,
  activeJobId: null,
  isInitialized: false,
  userPersonaStatus: null, // 'pending', 'done', etc.
  initialData: null, // Bootstrap data from backend
  jwt: null, // JWT token for API authentication
};

const careerHubSlice = createSlice({
  name: 'careerHub',
  initialState,
  reducers: {
    // LLD: Set current navigation tab
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    
    // LLD: Set active job ID (for job detail view)
    setActiveJobId: (state, action) => {
      state.activeJobId = action.payload;
    },
    
    // LLD: Mark Career Hub as initialized
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    
    // LLD: Store bootstrap initial data from backend
    setInitialData: (state, action) => {
      state.initialData = action.payload;
      state.isInitialized = true;
    },
    
    // LLD: Store JWT token for API authentication
    setJwt: (state, action) => {
      state.jwt = action.payload;
    },
    
    // LLD: Set user persona status (for workflow eligibility checks)
    setUserPersonaStatus: (state, action) => {
      state.userPersonaStatus = action.payload;
    },
  },
});

export const {
  setCurrentTab,
  setActiveJobId,
  setInitialized,
  setInitialData,
  setJwt,
  setUserPersonaStatus,
} = careerHubSlice.actions;

export default careerHubSlice.reducer;

