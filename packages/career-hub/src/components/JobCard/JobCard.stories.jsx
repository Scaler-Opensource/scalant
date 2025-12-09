import React from 'react';
import JobCard from './index';
import jobCardStates from '../../dummyData/jobCardStates.json';

export default {
  title: 'JobCard/JobCard',
  component: JobCard,
  parameters: {
    layout: 'padded',
  },
};

// Mock handlers
const handleSave = async (jobId, action) => {
  console.log(`${action} job ${jobId}`);
  return Promise.resolve();
};

const handleClick = (jobId) => {
  console.log(`Clicked job ${jobId}`);
};

// Default state
export const Default = () => (
  <JobCard
    jobData={jobCardStates.eligible}
    isActive={false}
    currentTab="all"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

// Active state
export const Active = () => (
  <JobCard
    jobData={jobCardStates.eligible}
    isActive={true}
    currentTab="all"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

// Quick Apply (Perfect Match)
export const QuickApply = () => (
  <JobCard
    jobData={jobCardStates.quickApply}
    isActive={false}
    currentTab="all"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

// Steps Pending
export const StepsPending = () => (
  <JobCard
    jobData={jobCardStates.stepsPending}
    isActive={false}
    currentTab="all"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

// Ineligible
export const Ineligible = () => (
  <JobCard
    jobData={jobCardStates.ineligible}
    isActive={false}
    currentTab="all"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

// Expired
export const Expired = () => (
  <JobCard
    jobData={jobCardStates.expired}
    isActive={false}
    currentTab="all"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

// Saved
export const Saved = () => (
  <JobCard
    jobData={jobCardStates.saved}
    isActive={false}
    currentTab="saved"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

// Notice Period Mismatch
export const NoticePeriodMismatch = () => (
  <JobCard
    jobData={jobCardStates.noticePeriodMismatch}
    isActive={false}
    currentTab="all"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

// Multiple Cities
export const MultipleCities = () => (
  <JobCard
    jobData={jobCardStates.multipleCities}
    isActive={false}
    currentTab="all"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

// Internship
export const Internship = () => (
  <JobCard
    jobData={jobCardStates.internship}
    isActive={false}
    currentTab="all"
    onClick={handleClick}
    onSave={handleSave}
    companiesList={{}}
    userCountry="IN"
  />
);

