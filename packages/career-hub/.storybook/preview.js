import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../src/store';
import careerHubApi from '../src/services/baseService';
import 'antd/dist/reset.css';

const theme = {
  token: {
    fontFamily: 'Inter, sans-serif',
  },
};

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      scalantCareerHub: rootReducer,
      [careerHubApi.reducerPath]: careerHubApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(careerHubApi.middleware),
    preloadedState,
  });
};

const store = createStore();

const withReduxProvider = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

const withAntdConfig = (Story) => (
  <ConfigProvider theme={theme}>
    <Story />
  </ConfigProvider>
);

export const decorators = [withReduxProvider, withAntdConfig];

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
  },
  viewport: {
    defaultViewport: 'responsive',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
};

