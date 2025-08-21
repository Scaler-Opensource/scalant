import { configureStore } from '@reduxjs/toolkit';
import { backlogServiceApi } from '../services/backlogService';

const store = configureStore({
  reducer: {
    [backlogServiceApi.reducerPath]: backlogServiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backlogServiceApi.middleware),
});

export default store;
