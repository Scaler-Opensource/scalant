import { combineReducers } from 'redux';
import { careerHubApi } from '../services/baseService';
import layoutReducer from './layoutSlice';
import jobPreviewReducer from './jobPreviewSlice';

const rootReducer = combineReducers({
  [careerHubApi.reducerPath]: careerHubApi.reducer,
  layout: layoutReducer,
  jobPreview: jobPreviewReducer,
});

export default rootReducer;
