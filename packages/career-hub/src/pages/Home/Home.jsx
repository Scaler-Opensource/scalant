import React, { useState } from 'react';
import HomePageLayout from './HomePageLayout';
import WorkflowChecklist from '../../components/Checklist/WorkflowChecklist';
import ResumeBuilderCard from '../../components/ResumeBuilderCard';
import DetailsPanel from '../../components/Checklist/DetailsPanel';
import workflowResponse from '../../dummyData/workflowResponse.json';
import { DESIGNATION_OPTIONS, INTENT_OPTIONS } from '../../utils/constants';

const Home = () => {
  const [currentDesignation, setCurrentDesignation] = useState(
    workflowResponse.meta?.source_persona || 'Non-tech'
  );
  const [currentIntent, setCurrentIntent] = useState('Looking for a job');
  
  const isJobIneligible = workflowResponse.meta?.is_job_ineligible || false;
  
  // Pre-select first pending step
  const getFirstPendingStep = () => {
    for (const group of workflowResponse.workflowGroups) {
      const pendingStep = group.steps?.find(step => 
        step.status === 'pending' || step.status === 'locked'
      );
      if (pendingStep) return pendingStep;
    }
    return null;
  };

  const [selectedStep, setSelectedStep] = useState(getFirstPendingStep());

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

  // Check if selected step is resume-related
  const isResumeStep = selectedStep?.label?.toLowerCase().includes('resume') ||
                       selectedStep?.definitions?.[0]?.key?.includes('resume');

  const leftContent = (
    <WorkflowChecklist
      workflowGroups={workflowResponse.workflowGroups}
      onStepSelect={handleStepSelect}
      isJobIneligible={isJobIneligible}
    />
  );

  // Show ResumeBuilderCard if resume step selected, otherwise DetailsPanel
  const rightContent = isResumeStep ? (
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

export default Home;

