import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// Note: Ant Design CSS is loaded via CDN in standalone.html
// Component styles are compiled and will be included automatically by Vite
import rootReducer from '../store';
import { careerHubApi, setBaseUrl } from '../services/baseService';
import JobsPage from '../components/JobsPage/JobsPage';
import userProfileData from '../components/JobsPage/userProfileData.json';

// Set base URL to use relative paths (will be proxied by Vite)
// In development, Vite proxy will handle the requests
// In production, update this to your actual API URL
setBaseUrl('');

// Configure Redux store
// RTK Query needs the API reducer at the root level (careerHubApi)
// Other reducers are nested under scalantCareerHub
const store = configureStore({
  reducer: {
    // RTK Query API reducer at root level
    [careerHubApi.reducerPath]: careerHubApi.reducer,
    // Other reducers nested under scalantCareerHub
    scalantCareerHub: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(careerHubApi.middleware),
  preloadedState: {
    scalantCareerHub: {
      dashboard: {
        processCounts: {
          all: 153,
          relevant: 0,
          draft: 0,
          applications: 9,
          saved: 0,
          archived: 0,
        },
        filterModalOpen: false,
      },
    },
  },
});

// Default process counts
const processCounts = {
  all: 153,
  relevant: 0,
  draft: 0,
  applications: 9,
  saved: 0,
  archived: 0,
};

// Mock functions for props
const openMockInterviewModal = () => {
  // Placeholder for mock interview modal
};

const openResume = () => {
  // Placeholder for open resume
};

// Render the app (React 16 compatible)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <JobsPage
        country="IN"
        processCounts={processCounts}
        userProfileData={userProfileData}
        openMockInterviewModal={openMockInterviewModal}
        openResume={openResume}
        onUploadFile={() => {
          return 'https://d1t59tgpzgv8ca.cloudfront.net/public_assets/assets/000/073/337/original/dummy-pdf_2.pdf?1765973287';
        }}
      />
    </Provider>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
