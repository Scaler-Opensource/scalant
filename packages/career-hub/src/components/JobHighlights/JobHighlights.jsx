import React, { useRef } from 'react';
import classnames from 'classnames';
import {
  ClockCircleTwoTone,
  EditOutlined,
  ExclamationCircleOutlined,
  StarTwoTone,
} from '@ant-design/icons';
import {
  ELIGIBILITY_TYPES,
  determineJobTag,
} from '../../utils/jobCard/eligibility';
import { JOB_BODY_TABS, TAG_TO_TAB_MAPPING } from '../../utils/constants';
import { toCamelCase } from '../../utils/caseUtil';
import { useJobPreview } from '../../contexts';
import ActionBanner from '../ActionBanner';
import styles from './JobHighlights.module.scss';

const ActionAlert = ({ eligibilityStatus, metric, onScrollToEnd }) => {
  const { setActiveTab } = useJobPreview();

  const handleClick = () => {
    setActiveTab(JOB_BODY_TABS.REQUIREMENTS.key);
    onScrollToEnd();
  };

  if (eligibilityStatus === ELIGIBILITY_TYPES.ineligible) {
    return (
      <div className={classnames(styles.actionAlert, styles.ineligible)}>
        <ExclamationCircleOutlined />
        <span className={styles.actionAlertTitle}>
          Unfortunately! Your profile does not have the relevant years of
          experience for this role
        </span>
      </div>
    );
  }

  if (eligibilityStatus === ELIGIBILITY_TYPES.steps_to_apply) {
    return (
      <ActionBanner
        icon={<ClockCircleTwoTone className={styles.actionAlertIcon} />}
        title={`Eligible to apply in ${metric} more steps!`}
        description="Complete these three test to become eligible to apply!"
        buttonText="Complete Tasks"
        buttonIcon={<EditOutlined />}
        className={styles.stepsToApply}
        onClick={handleClick}
      />
    );
  }

  return null;
};

const HighlightsList = ({ highlights }) => {
  return (
    <>
      <div className={styles.title}>Top Reasons to Apply</div>
      <ul className={styles.highlightsList}>
        {highlights?.map((highlight) => (
          <li key={highlight} className={styles.highlight}>
            <span className={styles.highlightText}>{highlight}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

const Keywords = ({ keywords, eligibilityStatus }) => {
  return (
    <div className={styles.keywordsList}>
      {keywords?.map((keyword, index) => (
        <div
          key={index}
          className={classnames(
            styles.keyword,
            styles[toCamelCase(eligibilityStatus)]
          )}
        >
          {keyword}
        </div>
      ))}
    </div>
  );
};

const Exceptions = ({ exceptionalJob }) => {
  if (!exceptionalJob) {
    return null;
  }

  const exceptionsList = [
    'Considering your current profile and preferences, you seem to be a right fit',
    'Which means that you get to apply to this job irrespective of the requirements mentioned below',
    'So in case this matches what you are looking for, please apply',
  ];

  return (
    <div className={styles.exceptions}>
      <div className={styles.exceptionsIconContainer}>
        <StarTwoTone
          size={20}
          twoToneColor="#FAAD14"
          className={styles.exceptionsIcon}
        />
      </div>
      <div>
        <div className={styles.exceptionsTitle}>
          We've made an exception for you!
        </div>
        <ul className={styles.exceptionsList}>
          {exceptionsList.map((exception, index) => (
            <li className={[styles.exception]} key={index}>
              {exception}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const JobHighlights = () => {
  const {
    jobData,
    highlights: contextHighlights,
    eligibilityCriteria,
    currentTab,
  } = useJobPreview();
  const ref = useRef(null);
  const { highlights, keywords } =
    contextHighlights || jobData?.highlights || {};
  const { tag: eligibilityStatus, count: metric } = determineJobTag(
    jobData,
    eligibilityCriteria || {}
  );

  const handleScrollToEnd = () => {
    // Scrolling to the bottom of the action alert (bringing it to the middle)
    if (ref.current && typeof window !== 'undefined') {
      const element = ref.current;
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.pageYOffset;
      const elementHeight = elementRect.height;
      const viewportHeight = window.innerHeight;

      const targetScrollPosition =
        elementTop + elementHeight - viewportHeight / 2;

      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  if (currentTab === TAG_TO_TAB_MAPPING.applied || !highlights?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={classnames(styles.container, styles[eligibilityStatus])}
    >
      <ActionAlert
        eligibilityStatus={eligibilityStatus}
        metric={metric}
        onScrollToEnd={handleScrollToEnd}
      />
      <HighlightsList highlights={highlights} />
      <Keywords keywords={keywords} eligibilityStatus={eligibilityStatus} />
      <Exceptions exceptionalJob={jobData?.exceptionalJob} />
    </div>
  );
};

export default JobHighlights;
