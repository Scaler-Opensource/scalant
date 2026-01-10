import React from 'react';
import JobsPage from './JobsPage';
import userProfileData from './userProfileData.json';

export default {
  title: 'Components/JobsPage',
  component: JobsPage,
};

export function Default() {
  const processCounts = {
    all: 153,
    relevant: 0,
    draft: 0,
    applications: 9,
    saved: 0,
    archived: 0,
  };

  return (
    <JobsPage processCounts={processCounts} userProfileData={userProfileData} />
  );
}

