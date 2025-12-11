import { combineReducers } from 'redux';
import { careerHubApi } from '../services/baseService';
import layoutReducer from './layoutSlice';
import filterReducer from './filterSlice';
import jobPreviewReducer from './jobPreviewSlice';
import dashboardReducer from './dashboardSlice';
import filterFormReducer from './filterFormSlice';
import metaDataReducer from './metaDataSlice';
import filterOptionsReducer from './filterOptionsSlice';

const rootReducer = combineReducers({
  [careerHubApi.reducerPath]: careerHubApi.reducer,
  layout: layoutReducer,
  filter: filterReducer,
  jobPreview: jobPreviewReducer,
  dashboard: dashboardReducer,
  filterForm: filterFormReducer,
  metaData: metaDataReducer,
  filterOptions: filterOptionsReducer,
});

export default rootReducer;
