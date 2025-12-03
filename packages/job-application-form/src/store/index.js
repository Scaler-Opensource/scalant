import { combineReducers } from 'redux';
import { jobApplicationFormApi } from '../services/baseService';

const rootReducer = combineReducers({
  [jobApplicationFormApi.reducerPath]: jobApplicationFormApi.reducer,
});

export default rootReducer;
