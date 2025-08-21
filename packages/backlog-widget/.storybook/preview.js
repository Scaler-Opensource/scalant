import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { backlogServiceApi } from '../src/services/backlogService';
import rootReducer from '../src/store';

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      scalantResumeBuilder: rootReducer,
      [backlogServiceApi.reducerPath]: backlogServiceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(backlogServiceApi.middleware),
    preloadedState,
  });
};

const store = createStore();

const withReduxProvider = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

// ✅ ESM-compatible export
export const decorators = [withReduxProvider];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  docs: {
    canvas: {
      sourceState: 'shown',
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#333333',
      },
      {
        name: 'gray',
        value: '#f5f5f5',
      },
    ],
  },
  viewport: {
    defaultViewport: 'responsive',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};
