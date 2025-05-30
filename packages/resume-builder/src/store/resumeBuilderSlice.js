import { createSlice } from '@reduxjs/toolkit';
import { STEPS_ORDER } from '../utils/constants';

const initialState = {
  isOnboarding: true,
  currentStep: 0,
  steps: STEPS_ORDER,
  resumeData: null,
  program: null,
};

const resumeBuilderSlice = createSlice({
  name: 'resumeBuilder',
  initialState,
  reducers: {
    setOnboarding: (state, action) => {
      state.isOnboarding = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < state.steps.length - 1) {
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    setResumeData: (state, action) => {
      state.resumeData = action.payload;
    },
    setProgram: (state, action) => {
      state.program = action.payload;
    },
    resetSteps: (state) => {
      state.currentStep = 0;
      state.steps = STEPS_ORDER;
    },
  },
});

export const {
  setOnboarding,
  setCurrentStep,
  nextStep,
  previousStep,
  setResumeData,
  resetSteps,
  setProgram,
} = resumeBuilderSlice.actions;
export default resumeBuilderSlice.reducer;
