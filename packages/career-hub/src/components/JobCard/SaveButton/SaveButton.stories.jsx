import React from 'react';
import SaveButton from './index';

export default {
  title: 'JobCard/SaveButton',
  component: SaveButton,
};

const handleSave = async (jobId, action) => {
  console.log(`${action} job ${jobId}`);
  return Promise.resolve();
};

export const Unsaved = () => (
  <SaveButton
    jobProfileId={123}
    applicationStatus="Not Applied"
    onSave={handleSave}
  />
);

export const Saved = () => (
  <SaveButton
    jobProfileId={123}
    applicationStatus="Saved"
    applicationLastUpdatedAt="2024-12-01T10:30:00Z"
    onSave={handleSave}
  />
);
