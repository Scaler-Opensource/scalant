import { createSlice } from '@reduxjs/toolkit';
import commonData from '../dummyData/commonData.json';
import { transformMetaData } from '../utils/metaDataTransform';

// Transform the initial meta data similar to meta.js
const rawMetaData = window.__CAREERS_HUB__ || commonData;
const transformedMetaData = transformMetaData(rawMetaData);

const initialState = {
  meta: transformedMetaData,
};

const metaDataSlice = createSlice({
  name: 'metaData',
  initialState,
  reducers: {
    setMetaData: (state, action) => {
      // Transform the payload before setting it
      state.meta = transformMetaData(action.payload);
    },
  },
});

export const { setMetaData } = metaDataSlice.actions;
export default metaDataSlice.reducer;
