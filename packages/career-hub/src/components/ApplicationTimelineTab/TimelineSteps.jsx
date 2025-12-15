import React from 'react';
import { Steps } from 'antd';
import { useJobPreview } from '../../contexts';

const TimelineSteps = () => {
  const { jobData } = useJobPreview();
  const { applicationTimeline } = jobData || {};
  const { timeline } = applicationTimeline || {};

  const items = timeline.map((item) => ({
    title: item.stageName,
    description: item.stageComments,
  }));

  const currentStep = timeline.findIndex(
    (item) => item.stageStatus === 'ongoing'
  );

  return <Steps current={currentStep} items={items} direction="vertical" />;
};

export default TimelineSteps;
