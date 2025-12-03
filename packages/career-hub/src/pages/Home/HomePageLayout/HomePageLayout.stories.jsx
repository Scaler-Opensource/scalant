import React, { useState } from 'react';
import HomePageLayout from './HomePageLayout';
import WorkflowChecklist from '../../../components/Checklist/WorkflowChecklist';
import ResumeBuilderCard from '../../../components/ResumeBuilderCard';
import DetailsPanel from '../../../components/Checklist/DetailsPanel';
import workflowResponse from '../../../dummyData/workflowResponse.json';
import workflowResponseJobIneligible from '../../../dummyData/workflowResponseJobIneligible.json';
import { DESIGNATION_OPTIONS, INTENT_OPTIONS } from '../../../utils/constants';

export default {
  title: 'Pages/HomePageLayout',
  component: HomePageLayout,
};

// Helper to get first pending step
const getFirstPendingStep = (workflowGroups) => {
  for (const group of workflowGroups) {
    const pendingStep = group.steps?.find(step => 
      step.status === 'pending' || step.status === 'locked'
    );
    if (pendingStep) return pendingStep;
  }
  return null;
};

// Helper to check if step is resume-related
const isResumeStep = (step) => {
  return step?.label?.toLowerCase().includes('resume') ||
         step?.definitions?.[0]?.key?.includes('resume');
};

export const JobEligibleWithStatusBadges = () => {
  const [currentDesignation, setCurrentDesignation] = useState(
    workflowResponse.meta?.source_persona || 'Non-tech'
  );
  const [currentIntent, setCurrentIntent] = useState('Looking for a job');
  
  const isJobIneligible = workflowResponse.meta?.is_job_ineligible || false;
  const [selectedStep, setSelectedStep] = useState(getFirstPendingStep(workflowResponse.workflowGroups));

  const handleStepSelect = (step) => {
    setSelectedStep(step);
  };

  const handleActionClick = (action, step) => {
    console.log('Action clicked:', action, step);
  };

  const handleCreateResume = () => {
    console.log('Create resume clicked');
  };

  const handleGoToRepository = () => {
    console.log('Go to repository clicked');
  };

  const leftContent = (
    <WorkflowChecklist
      workflowGroups={workflowResponse.workflowGroups}
      onStepSelect={handleStepSelect}
      isJobIneligible={isJobIneligible}
    />
  );

  const rightContent = isResumeStep(selectedStep) ? (
    <ResumeBuilderCard
      onCreateResume={handleCreateResume}
      onGoToRepository={handleGoToRepository}
    />
  ) : (
    <DetailsPanel
      selectedStep={selectedStep}
      onActionClick={handleActionClick}
    />
  );

  return (
    <HomePageLayout
      leftContent={leftContent}
      rightContent={rightContent}
      currentDesignation={currentDesignation}
      currentIntent={currentIntent}
      onDesignationChange={setCurrentDesignation}
      onIntentChange={setCurrentIntent}
      designationOptions={DESIGNATION_OPTIONS}
      intentOptions={INTENT_OPTIONS}
      hasSelectedStep={true}
    />
  );
};

export const JobIneligibleWithProgressBar = () => {
  const [currentDesignation, setCurrentDesignation] = useState(
    workflowResponseJobIneligible.meta?.source_persona || 'Non-tech'
  );
  const [currentIntent, setCurrentIntent] = useState('Looking for a job');
  
  const isJobIneligible = workflowResponseJobIneligible.meta?.is_job_ineligible || true;
  const [selectedStep, setSelectedStep] = useState(getFirstPendingStep(workflowResponseJobIneligible.workflowGroups));

  const handleStepSelect = (step) => {
    setSelectedStep(step);
  };

  const handleActionClick = (action, step) => {
    console.log('Action clicked:', action, step);
  };

  const handleCreateResume = () => {
    console.log('Create resume clicked');
  };

  const handleGoToRepository = () => {
    console.log('Go to repository clicked');
  };

  const leftContent = (
    <WorkflowChecklist
      workflowGroups={workflowResponseJobIneligible.workflowGroups}
      onStepSelect={handleStepSelect}
      isJobIneligible={isJobIneligible}
    />
  );

  const rightContent = isResumeStep(selectedStep) ? (
    <ResumeBuilderCard
      onCreateResume={handleCreateResume}
      onGoToRepository={handleGoToRepository}
    />
  ) : (
    <DetailsPanel
      selectedStep={selectedStep}
      onActionClick={handleActionClick}
    />
  );

  return (
    <HomePageLayout
      leftContent={leftContent}
      rightContent={rightContent}
      currentDesignation={currentDesignation}
      currentIntent={currentIntent}
      onDesignationChange={setCurrentDesignation}
      onIntentChange={setCurrentIntent}
      designationOptions={DESIGNATION_OPTIONS}
      intentOptions={INTENT_OPTIONS}
      hasSelectedStep={true}
    />
  );
};

export const WithResumeBuilderCard = () => {
  const [currentDesignation, setCurrentDesignation] = useState('Non-tech');
  const [currentIntent, setCurrentIntent] = useState('Looking for a job');
  
  const isJobIneligible = workflowResponse.meta?.is_job_ineligible || false;
  
  // Find resume step
  const resumeStep = workflowResponse.workflowGroups
    .flatMap(group => group.steps)
    .find(step => step.label?.toLowerCase().includes('resume builder'));
  
  const [selectedStep, setSelectedStep] = useState(resumeStep);

  const handleStepSelect = (step) => {
    setSelectedStep(step);
  };

  const handleActionClick = (action, step) => {
    console.log('Action clicked:', action, step);
  };

  const handleCreateResume = () => {
    console.log('Create resume clicked');
  };

  const handleGoToRepository = () => {
    console.log('Go to repository clicked');
  };

  const leftContent = (
    <WorkflowChecklist
      workflowGroups={workflowResponse.workflowGroups}
      onStepSelect={handleStepSelect}
      isJobIneligible={isJobIneligible}
    />
  );

  const rightContent = (
    <ResumeBuilderCard
      onCreateResume={handleCreateResume}
      onGoToRepository={handleGoToRepository}
    />
  );

  return (
    <HomePageLayout
      leftContent={leftContent}
      rightContent={rightContent}
      currentDesignation={currentDesignation}
      currentIntent={currentIntent}
      onDesignationChange={setCurrentDesignation}
      onIntentChange={setCurrentIntent}
      designationOptions={DESIGNATION_OPTIONS}
      intentOptions={INTENT_OPTIONS}
      hasSelectedStep={true}
    />
  );
};
