// Workflow/Eligibility Slice
// LLD: Manages eligibility workflow state and progress tracking
// Handles workflow data fetching and step completion status

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_PATH } from '../utils/constants';

// LLD: Async thunk to fetch workflow/eligibility progress
export const fetchWorkflowData = createAsyncThunk(
  'workflow/fetchWorkflowData',
  async (_, { getState, rejectWithValue }) => {
    try {
      // LLD: Make API call to get workflow progress
      // Endpoint: /api/v3/careers-hub/eligibility/progress/
      // API Response structure: { workflowGroups: [...], meta: {...} }
      // const response = await apiRequest('GET', '/api/v3/careers-hub/eligibility/progress/');
      // return response.data; // Response contains workflowGroups and meta at root level

      // TODO: Replace with actual API call
      // For now return empty structure - will be populated by API
      return {
        workflowGroups: [],
        meta: {
          source_persona: null,
          target_persona: null,
          completed_all_steps: false,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  workflowGroups: [], // Array of workflow groups from API
  workflowMeta: {
    source_persona: null,
    target_persona: null,
    completed_all_steps: false,
    eligibility_checks_failed_again: false,
    resume_completed: false,
    is_job_ineligible: false,
  },
  isLoading: false,
  error: null,
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    // LLD: Update workflow step status
    updateStepStatus: (state, action) => {
      const { stepId, status } = action.payload;
      // Find and update the step in workflowData
      // Implementation depends on workflow data structure
    },
    
    // LLD: Mark workflow as completed
    completeWorkflow: (state) => {
      state.workflowMeta.completedAllSteps = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // LLD: Handle fetchWorkflowData async thunk
      .addCase(fetchWorkflowData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkflowData.fulfilled, (state, action) => {
        state.isLoading = false;
        // LLD: API response structure: { workflowGroups: [...], meta: {...} }
        // Response has workflowGroups and meta at root level
        const payload = action.payload || {};
        
        // LLD: Store workflow groups from API response
        state.workflowGroups = payload.workflowGroups || [];
        
        // LLD: Store workflow metadata from API response
        if (payload.meta) {
          state.workflowMeta = {
            ...state.workflowMeta,
            ...payload.meta,
          };
        }
      })
      .addCase(fetchWorkflowData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { updateStepStatus, completeWorkflow } = workflowSlice.actions;

export default workflowSlice.reducer;

