import { combineReducers } from 'redux';
import { careerHubApi } from '../services/baseService';
import layoutReducer from './layoutSlice';
import filterReducer from './filterSlice';
import dashboardReducer from './dashboardSlice';
import filterFormReducer from './filterFormSlice';
import metaDataReducer from './metaDataSlice';
import filterOptionsReducer from './filterOptionsSlice';
import alertReducer from './alertSlice';
import savedJobsReducer from './savedJobsSlice';
import resumeFitmentReducer from './resumeFitmentSlice';

const rootReducer = combineReducers({
  [careerHubApi.reducerPath]: careerHubApi.reducer,
  layout: layoutReducer,
  filter: filterReducer,
  dashboard: dashboardReducer,
  filterForm: filterFormReducer,
  metaData: metaDataReducer,
  filterOptions: filterOptionsReducer,
  alerts: alertReducer,
  savedJobs: savedJobsReducer,
  resumeFitment: resumeFitmentReducer,
});

export default rootReducer;
