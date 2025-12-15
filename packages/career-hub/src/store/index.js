import { combineReducers } from 'redux';
import { careerHubApi } from '../services/baseService';
import layoutReducer from './layoutSlice';
import filterReducer from './filterSlice';
import dashboardReducer from './dashboardSlice';
import filterFormReducer from './filterFormSlice';
import metaDataReducer from './metaDataSlice';
import filterOptionsReducer from './filterOptionsSlice';

const rootReducer = combineReducers({
  [careerHubApi.reducerPath]: careerHubApi.reducer,
  layout: layoutReducer,
  filter: filterReducer,
  dashboard: dashboardReducer,
  filterForm: filterFormReducer,
  metaData: metaDataReducer,
  filterOptions: filterOptionsReducer,
});

export default rootReducer;
