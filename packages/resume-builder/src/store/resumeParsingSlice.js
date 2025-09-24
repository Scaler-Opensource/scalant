import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle', // idle | loading | success | error
  percent: 0,
  errorMessage: null,
  parsedData: {},
};

const resumeParsingSlice = createSlice({
  name: 'resumeParsing',
  initialState,
  reducers: {
    setParsingLoading: (state, action) => {
      state.status = 'loading';
      state.percent = typeof action.payload === 'number' ? action.payload : 0;
      state.errorMessage = null;
    },
    setParsingPercent: (state, action) => {
      if (state.status === 'loading') {
        state.percent = action.payload;
      }
    },
    setParsingSuccess: (state) => {
      state.status = 'success';
      state.percent = 100;
      state.errorMessage = null;
    },
    setParsedData: (state, action) => {
      state.parsedData = action.payload;
    },
    setParsingError: (state, action) => {
      state.status = 'error';
      state.errorMessage = action.payload || 'Something went wrong';
    },
    resetParsing: () => initialState,
  },
});

export const {
  setParsingLoading,
  setParsingPercent,
  setParsingSuccess,
  setParsingError,
  resetParsing,
  setParsedData,
} = resumeParsingSlice.actions;

export default resumeParsingSlice.reducer;
