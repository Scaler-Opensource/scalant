import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../src/store';
import { careerHubApi } from '../src/services/careerHubApi';
import 'antd/dist/reset.css'; // Optional global reset

const theme = {
  token: {
    fontFamily: 'Inter, sans-serif',
  },
};

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      scalantCareerHub: rootReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [],
        },
      })
      .concat(careerHubApi.middleware),
    preloadedState,
  });
};

const store = createStore();

const withReduxProvider = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

const withRouter = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const withAntdConfig = (Story) => (
  <ConfigProvider theme={theme}>
    <Story />
  </ConfigProvider>
);

// ✅ ESM-compatible export
export const decorators = [withReduxProvider, withRouter, withAntdConfig];

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
