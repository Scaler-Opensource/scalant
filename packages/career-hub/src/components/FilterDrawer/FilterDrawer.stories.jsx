import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FilterDrawer from './FilterDrawer';
import rootReducer from '../../store';

const store = configureStore({
  reducer: {
    scalantCareerHub: rootReducer,
  },
  preloadedState: {
    scalantCareerHub: {
      dashboard: {
        processCounts: {
          all: 0,
          relevant: 0,
          draft: 0,
          applications: 0,
          saved: 0,
          archived: 0,
        },
        filterModalOpen: true,
      },
    },
  },
});

export default {
  title: 'Components/FilterDrawer',
  component: FilterDrawer,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export function Default() {
  return <FilterDrawer />;
}

