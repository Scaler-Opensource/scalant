import React from 'react';
import JobsLayout from './JobsLayout';

export default {
  title: 'Layouts/JobsLayout',
  component: JobsLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export function Default() {
  return (
    <JobsLayout>
      <div style={{ padding: '20px', background: 'white', borderRadius: '8px' }}>
        <h2>Jobs Content</h2>
        <p>This is the default JobsLayout with sample content.</p>
      </div>
    </JobsLayout>
  );
}

