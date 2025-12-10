import { combineReducers } from 'redux';
import { careerHubApi } from '../services/baseService';
import layoutReducer from './layoutSlice';
import filterReducer from './filterSlice';
import jobPreviewReducer from './jobPreviewSlice';

const rootReducer = combineReducers({
  [careerHubApi.reducerPath]: careerHubApi.reducer,
  layout: layoutReducer,
  filter: filterReducer,
  jobPreview: jobPreviewReducer,
});

export default rootReducer;
