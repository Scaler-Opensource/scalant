import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES, DEFAULT_REDIRECT_PATH } from '../utils/constants';
import CareerHubLayout from '../layout/CareerHubLayout';
import LoadingLayout from '../components/LoadingLayout';
import Home from '../pages/Home/Home';
import Jobs from '../pages/Jobs/Jobs';
import MyResume from '../pages/MyResume/MyResume';
import Preferences from '../pages/Preferences/Preferences';

const LoadingFallback = () => <LoadingLayout />;

const AppRouter = ({
  basename = '/academy/mentee-dashboard/careers-hub',
  initialData = null,
  jwt = null,
  defaultRedirectPath = DEFAULT_REDIRECT_PATH,
  skipRouter = false,
}) => {
  const routesContent = (
    <CareerHubLayout initialData={initialData} jwt={jwt}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.JOBS} element={<Jobs />} />
          <Route path={ROUTES.MY_RESUME} element={<MyResume />} />
          <Route path={ROUTES.PREFERENCES} element={<Preferences />} />
          <Route path="*" element={<Navigate to={defaultRedirectPath} replace />} />
        </Routes>
      </Suspense>
    </CareerHubLayout>
  );

  if (skipRouter) {
    return routesContent;
  }

  return (
    <BrowserRouter basename={basename}>
      {routesContent}
    </BrowserRouter>
  );
};

export default AppRouter;

