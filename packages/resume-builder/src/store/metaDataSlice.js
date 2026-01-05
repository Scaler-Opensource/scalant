/* global window */
import { createSlice } from '@reduxjs/toolkit';
import commonData from '../dummyData/commonData.json';
const initialState = {
  meta: window.__CAREERS_HUB__ || commonData,
};

const metaDataSlice = createSlice({
  name: 'metaData',
  initialState,
  reducers: {
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
});

export const { setMetaData } = metaDataSlice.actions;
export default metaDataSlice.reducer;
