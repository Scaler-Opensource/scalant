import { combineReducers } from 'redux';
import { careerHubApi } from '../services/baseService';
import layoutReducer from './layoutSlice';
import filterReducer from './filterSlice';
import jobPreviewReducer from './jobPreviewSlice';
import dashboardReducer from './dashboardSlice';

const rootReducer = combineReducers({
  [careerHubApi.reducerPath]: careerHubApi.reducer,
  layout: layoutReducer,
  filter: filterReducer,
  jobPreview: jobPreviewReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
