import { createSlice } from '@reduxjs/toolkit';
import merge from 'deepmerge';
import { STEPS_ORDER } from '../utils/constants';

const replaceArrays = (_destinationArray, sourceArray) => sourceArray;

const initialState = {
  isOnboarding: true,
  currentStep: 0,
  steps: STEPS_ORDER,
  resumeData: {},
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
    setSteps: (state, action) => {
      const nextSteps = Array.isArray(action.payload)
        ? action.payload
        : STEPS_ORDER;
      state.steps = nextSteps;
      if (state.currentStep > nextSteps.length - 1) {
        state.currentStep = Math.max(0, nextSteps.length - 1);
      }
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
      state.resumeData = merge(state.resumeData, action.payload, {
        arrayMerge: replaceArrays,
      });
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
  setSteps,
  nextStep,
  previousStep,
  setResumeData,
  resetSteps,
  setProgram,
} = resumeBuilderSlice.actions;
export default resumeBuilderSlice.reducer;
