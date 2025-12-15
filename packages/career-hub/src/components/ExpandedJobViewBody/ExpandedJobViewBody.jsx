import React from 'react';
import { Tabs } from 'antd';
import { JOB_BODY_TABS } from '../../utils/constants';
import { useJobPreview } from '../../contexts';
import ApplicationTimelineTab from '../ApplicationTimelineTab';
import JobDescriptionTab from '../JobDescriptionTab';
import SkillsRequiredTab from '../SkillsRequiredTab';
import styles from './ExpandedJobViewBody.module.scss';

const ExpandedJobViewBody = () => {
  const { activeTab, setActiveTab, jobData } = useJobPreview();
  const { applicationTimeline } = jobData || {};

  const isTimelineAvailable = applicationTimeline?.timeline?.length > 0;

  const tabItems = [
    isTimelineAvailable && {
      key: JOB_BODY_TABS.APPLICATION_TIMELINE.key,
      label: JOB_BODY_TABS.APPLICATION_TIMELINE.label,
      children: <ApplicationTimelineTab />,
    },
    {
      key: JOB_BODY_TABS.ABOUT_ROLE.key,
      label: JOB_BODY_TABS.ABOUT_ROLE.label,
      children: <JobDescriptionTab />,
    },
    {
      key: JOB_BODY_TABS.REQUIREMENTS.key,
      label: JOB_BODY_TABS.REQUIREMENTS.label,
      children: <SkillsRequiredTab />,
    },
  ].filter(Boolean);

  return (
    <div className={styles.bodyContainer}>
      <Tabs
        activeKey={activeTab}
        className={styles.tabs}
        items={tabItems}
        onChange={setActiveTab}
      />
    </div>
  );
};

export default ExpandedJobViewBody;
