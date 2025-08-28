import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  reviewData: null,
};

const resumeReviewSlice = createSlice({
  name: 'resumeReview',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setReviewData: (state, action) => {
      state.reviewData = action.payload;
    },
  },
});

export const { setIsLoading, setIsError, setReviewData } =
  resumeReviewSlice.actions;
export default resumeReviewSlice.reducer;
