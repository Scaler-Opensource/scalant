import { combineReducers } from 'redux';
import { backlogServiceApi } from '../services/backlogService';

const rootReducer = combineReducers({
  [backlogServiceApi.reducerPath]: backlogServiceApi.reducer,
});

export default rootReducer;
