import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveTab } from '../../store/jobPreviewSelectors';
import { setActiveTab } from '../../store/jobPreviewSlice';
import JobDescriptionTab from '../JobDescriptionTab';
import SkillsRequiredTab from '../SkillsRequiredTab';
import styles from './ExpandedJobViewBody.module.scss';

/**
 * ExpandedJobViewBody - Tab container component for expanded job view
 * 
 * Layout Component:
 * - Manages tab structure using Ant Design Tabs
 * - Handles tab switching via Redux
 * - Contains two tabs: "About Role" and "Requirements"
 */
const ExpandedJobViewBody = ({
  jobData,
  companyData,
  eligibilityCriteria,
  currentTab,
}) => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

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
          children: (
            <div data-tab-key={item.key}>
              {item.children}
            </div>
          ),
        }))}
        className={styles.tabs}
      />
    </div>
  );
};

ExpandedJobViewBody.propTypes = {
  jobData: PropTypes.object.isRequired,
  companyData: PropTypes.object,
  eligibilityCriteria: PropTypes.object,
  currentTab: PropTypes.string,
};

ExpandedJobViewBody.defaultProps = {
  companyData: null,
  eligibilityCriteria: null,
  currentTab: 'all',
};

export default ExpandedJobViewBody;

