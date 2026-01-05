import { combineReducers } from 'redux';
import { careerHubApi } from '../services/baseService';

const rootReducer = combineReducers({
  [careerHubApi.reducerPath]: careerHubApi.reducer,
});

export default rootReducer;

