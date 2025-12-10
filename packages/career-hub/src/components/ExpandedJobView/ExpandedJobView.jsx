import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Spin, Alert } from 'antd';
import PropTypes from 'prop-types';
import { useGetJobPreviewQuery } from '../../services/jobPreviewApi';
import { setActiveJob, setShouldScroll } from '../../store/jobPreviewSlice';
import { selectActiveJobId, selectShouldScroll } from '../../store/jobPreviewSelectors';
import ExpandedJobViewHeader from '../ExpandedJobViewHeader';
import JobHighlights from '../JobHighlights';
import ExpandedJobViewBody from '../ExpandedJobViewBody';
import styles from './ExpandedJobView.module.scss';

/**
 * ExpandedJobView - Main container component for expanded job view
 * 
 * Features:
 * - Uses RTK Query directly for data fetching (useGetJobPreviewQuery)
 * - Manages tab state via Redux
 * - Handles scroll-to-table functionality
 * - Orchestrates layout: Header → Highlights → Body
 * 
 * Data Flow:
 * - Component calls useGetJobPreviewQuery(jobId)
 * - RTK Query handles caching, loading, error states
 * - Data flows directly to child components
 */
const ExpandedJobView = ({ jobId, isActive, onClose, currentTab }) => {
  const dispatch = useDispatch();
  const activeJobId = useSelector(selectActiveJobId);
  const shouldScroll = useSelector(selectShouldScroll);
  
  // RTK Query hook - handles data fetching, caching, loading, error
  const { data, isLoading, error } = useGetJobPreviewQuery(jobId, {
    skip: !jobId || !isActive,
  });
  
  const scrollTargetRef = useRef(null);

  // Set active job when jobId changes
  useEffect(() => {
    if (jobId && jobId !== activeJobId) {
      dispatch(setActiveJob(jobId));
    }
  }, [jobId, activeJobId, dispatch]);

  // Scroll to requirements table when shouldScroll is true
  useEffect(() => {
    if (shouldScroll) {
      setTimeout(() => {
        const requirementsTab = document.querySelector('[data-tab-key="requirements"]');
        const requirementsTable = document.querySelector('.expertSkillsTable, .techStackTable');
        const scrollTarget = requirementsTable || requirementsTab;
        
        if (scrollTarget) {
          scrollTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else if (scrollTargetRef.current) {
          scrollTargetRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
        dispatch(setShouldScroll(false));
      }, 300);
    }
  }, [shouldScroll, dispatch]);

  if (!isActive || !jobId) {
    return null;
  }

  if (isLoading) {
    return (
      <Card className={`${styles.expandedJobView} ${styles.loadingCard}`}>
        <Spin size="large" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={styles.expandedJobView}>
        <Alert
          type="error"
          message="Failed to load job details"
          description={error?.data?.message || error?.message || 'Please try again later'}
          showIcon
        />
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  // Show highlights if they exist
  const hasHighlights = data.highlights?.highlights?.length > 0;

  return (
    <div className={styles.expandedJobView} ref={scrollTargetRef}>
      <ExpandedJobViewHeader
        jobData={data.jobData}
        companyData={data.companyData}
        eligibilityCriteria={data.eligibilityCriteria}
        currentTab={currentTab}
        onApply={async (jobId) => {
          // Host app should implement this
          console.log('Apply clicked for job:', jobId);
        }}
        onSave={async (jobId, action) => {
          // Host app should implement this
          console.log('Save action:', action, 'for job:', jobId);
        }}
      />
      
      {hasHighlights && (
        <JobHighlights
          highlights={data.highlights}
          eligibilityCriteria={data.eligibilityCriteria}
        />
      )}
      
      <ExpandedJobViewBody
        jobData={data.jobData}
        companyData={data.companyData}
        eligibilityCriteria={data.eligibilityCriteria}
        currentTab={currentTab}
      />
    </div>
  );
};

ExpandedJobView.propTypes = {
  jobId: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  onClose: PropTypes.func,
  currentTab: PropTypes.string,
};

ExpandedJobView.defaultProps = {
  isActive: false,
  onClose: null,
  currentTab: 'all',
};

export default ExpandedJobView;
