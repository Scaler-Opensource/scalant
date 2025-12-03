import React from 'react';
import ResumeBuilderCard from './ResumeBuilderCard';

export default {
  title: 'Components/ResumeBuilderCard',
  component: ResumeBuilderCard,
};

export const Default = () => (
  <div style={{ maxWidth: '800px', padding: '24px' }}>
    <ResumeBuilderCard
      onCreateResume={() => console.log('Create resume')}
      onGoToRepository={() => console.log('Go to repository')}
    />
  </div>
);

