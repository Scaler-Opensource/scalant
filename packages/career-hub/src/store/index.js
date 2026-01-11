import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import careerHubReducer from './careerHubSlice';
import workflowReducer from './workflowSlice';
import { careerHubApi } from '../services/careerHubApi';

const rootReducer = combineReducers({
  careerHub: careerHubReducer,
  workflow: workflowReducer,
  [careerHubApi.reducerPath]: careerHubApi.reducer,
});

export default rootReducer;

export const store = configureStore({
  reducer: {
    scalantCareerHub: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }).concat(careerHubApi.middleware),
});

