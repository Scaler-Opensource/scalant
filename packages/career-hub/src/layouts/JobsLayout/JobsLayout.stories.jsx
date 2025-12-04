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
      
        <h2>Jobs Content</h2>
        <p>This is the default JobsLayout with sample content.</p>
    
    </JobsLayout>
  );
}

