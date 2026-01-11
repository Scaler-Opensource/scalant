import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import AppRouter from '../routing/AppRouter';
import { store } from '../store';

const antdTheme = {
  token: {
    fontFamily: 'Inter, sans-serif',
  },
};

const CareerHub = ({
  basename = '/academy/mentee-dashboard/careers-hub',
  initialData = null,
  jwt = null,
  isUgLearner = false,
  allJobsPageRedirectEnabled = false,
  skipProvider = false,
  skipRouter = false,
}) => {
  const content = (
    <ConfigProvider theme={antdTheme}>
      <AppRouter
        basename={basename}
        initialData={initialData}
        jwt={jwt}
        isUgLearner={isUgLearner}
        allJobsPageRedirectEnabled={allJobsPageRedirectEnabled}
        skipRouter={skipRouter}
      />
    </ConfigProvider>
  );

  if (skipProvider) {
    return content;
  }

  return <Provider store={store}>{content}</Provider>;
};

export default CareerHub;

