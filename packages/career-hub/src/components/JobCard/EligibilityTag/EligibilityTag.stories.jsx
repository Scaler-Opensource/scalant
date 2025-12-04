import React from 'react';
import EligibilityTag from './index';
import jobCardStates from '../../../dummyData/jobCardStates.json';

export default {
  title: 'JobCard/EligibilityTag',
  component: EligibilityTag,
};

export const QuickApply = () => (
  <EligibilityTag jobData={jobCardStates.quickApply} currentTab="all" />
);

export const Eligible = () => (
  <EligibilityTag jobData={jobCardStates.eligible} currentTab="all" />
);

export const StepsPending = () => (
  <EligibilityTag jobData={jobCardStates.stepsPending} currentTab="all" />
);

export const Ineligible = () => (
  <EligibilityTag jobData={jobCardStates.ineligible} currentTab="all" />
);

export const Expired = () => (
  <EligibilityTag jobData={jobCardStates.expired} currentTab="all" />
);

export const NoticePeriodMismatch = () => (
  <EligibilityTag jobData={jobCardStates.noticePeriodMismatch} currentTab="all" />
);

// All tags in one view
export const AllStates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ width: '180px' }}>Quick Apply:</span>
      <EligibilityTag jobData={jobCardStates.quickApply} currentTab="all" />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ width: '180px' }}>Eligible:</span>
      <EligibilityTag jobData={jobCardStates.eligible} currentTab="all" />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ width: '180px' }}>Steps Pending:</span>
      <EligibilityTag jobData={jobCardStates.stepsPending} currentTab="all" />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ width: '180px' }}>Ineligible:</span>
      <EligibilityTag jobData={jobCardStates.ineligible} currentTab="all" />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ width: '180px' }}>Expired:</span>
      <EligibilityTag jobData={jobCardStates.expired} currentTab="all" />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ width: '180px' }}>Notice Period Mismatch:</span>
      <EligibilityTag jobData={jobCardStates.noticePeriodMismatch} currentTab="all" />
    </div>
  </div>
);

