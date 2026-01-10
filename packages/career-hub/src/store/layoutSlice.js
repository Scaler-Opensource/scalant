import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedJobId: null,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSelectedJobId: (state, action) => {
      state.selectedJobId = action.payload;
    },
    clearSelectedJobId: (state) => {
      state.selectedJobId = null;
    },
  },
});

export const { setSelectedJobId, clearSelectedJobId } = layoutSlice.actions;
export default layoutSlice.reducer;
