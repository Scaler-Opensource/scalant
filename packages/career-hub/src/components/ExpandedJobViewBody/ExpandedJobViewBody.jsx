import React from 'react';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveTab } from '../../store/jobPreviewSelectors';
import { setActiveTab } from '../../store/jobPreviewSlice';
import { useJobPreview } from '../../contexts';
import JobDescriptionTab from '../JobDescriptionTab';
import SkillsRequiredTab from '../SkillsRequiredTab';
import styles from './ExpandedJobViewBody.module.scss';

const ExpandedJobViewBody = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const { jobData, companyData, eligibilityCriteria } = useJobPreview();

  const handleTabChange = (key) => {
    dispatch(setActiveTab(key));
  };

  const tabItems = [
    {
      key: 'about-role',
      label: 'About Role',
      children: (
        <JobDescriptionTab jobData={jobData} companyData={companyData} />
      ),
    },
    {
      key: 'requirements',
      label: 'Requirements',
      children: (
        <SkillsRequiredTab
          eligibilityCriteria={eligibilityCriteria}
          jobData={jobData}
        />
      ),
    },
  ];

  return (
    <div className={styles.bodyContainer}>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems.map((item) => ({
          ...item,
          children: <div data-tab-key={item.key}>{item.children}</div>,
        }))}
        className={styles.tabs}
      />
    </div>
  );
};

export default ExpandedJobViewBody;
