import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TagsSection from './TagsSection';
import rootReducer from '../../store';

const store = configureStore({
  reducer: {
    scalantCareerHub: rootReducer,
  },
  preloadedState: {
    scalantCareerHub: {
      dashboard: {
        processCounts: {
          all: 4,
          relevant: 0,
          draft: 0,
          applications: 9,
          saved: 0,
          archived: 0,
        },
        filterModalOpen: false,
        jobAlertModalOpen: false,
      },
      filter: {
        tab: 'all',
      },
    },
  },
});

export default {
  title: 'Components/TagsSection',
  component: TagsSection,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export function Default() {
  return <TagsSection />;
}

