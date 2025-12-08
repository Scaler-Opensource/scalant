import { createSlice } from '@reduxjs/toolkit';

/**
 * jobPreviewSlice - Redux slice for UI state only
 * 
 * Data fetching and caching handled by RTK Query, not Redux store.
 * This slice only manages UI interaction state.
 */
const initialState = {
  activeJobId: null,
  activeTab: 'requirements',
  shouldScroll: false,
};

const jobPreviewSlice = createSlice({
  name: 'jobPreview',
  initialState,
  reducers: {
    setActiveJob: (state, action) => {
      state.activeJobId = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setShouldScroll: (state, action) => {
      state.shouldScroll = action.payload;
    },
    resetPreview: () => initialState,
  },
});

export const {
  setActiveJob,
  setActiveTab,
  setShouldScroll,
  resetPreview,
} = jobPreviewSlice.actions;

export default jobPreviewSlice.reducer;
