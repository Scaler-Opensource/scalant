import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedJobs: {}, // { jobId: { status: 'Saved', lastUpdatedAt: '...' } }
};

const savedJobsSlice = createSlice({
  name: 'savedJobs',
  initialState,
  reducers: {
    setJobSavedStatus: (state, action) => {
      const { jobId, status, lastUpdatedAt } = action.payload;
      if (status === 'Saved') {
        state.savedJobs[jobId] = {
          status: 'Saved',
          lastUpdatedAt: lastUpdatedAt || new Date().toISOString(),
        };
      } else {
        // Remove from saved jobs if unsaved
        delete state.savedJobs[jobId];
      }
    },
    initializeSavedJobs: (state, action) => {
      // Initialize from API data (e.g., when jobs are loaded)
      const jobs = action.payload || [];
      jobs.forEach((job) => {
        if (job.applicationStatus === 'Saved') {
          state.savedJobs[job.id] = {
            status: 'Saved',
            lastUpdatedAt:
              job.applicationLastUpdatedAt || new Date().toISOString(),
          };
        }
      });
    },
    clearSavedJobs: (state) => {
      state.savedJobs = {};
    },
  },
});

export const { setJobSavedStatus, initializeSavedJobs, clearSavedJobs } =
  savedJobsSlice.actions;

export default savedJobsSlice.reducer;
