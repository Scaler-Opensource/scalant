import React from 'react';
import JobsPage from './JobsPage';

export default {
  title: 'Components/JobsPage',
  component: JobsPage,
};

export function Default() {
  return (
    <JobsPage>
      <h2>Jobs Content</h2>
      <p>This is the default JobsPage with sample content.</p>
    </JobsPage>
  );
}

