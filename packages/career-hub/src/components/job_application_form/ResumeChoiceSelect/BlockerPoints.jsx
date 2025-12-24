import React, { useState } from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import {
  CheckCircleTwoTone,
  DownOutlined,
  ExclamationCircleTwoTone,
  UpOutlined,
} from '@ant-design/icons';
import { useApplicationFormContext, useJobPreview } from '../../../contexts';
import { PRODUCT_NAME } from '../../../utils/tracking';
import styles from './ResumeChoiceSelect.module.scss';

export const RESUME_BLOCKER_POINTS = {
  bullets: () => (
    <span>
      Bullet points should be used in project and work experience description
      for improved readability. Please use text editor's bullet point
      functionality for better indentation & formatting.
    </span>
  ),
  skills: () => (
    <span>At-least 5 skills should be included in your resume.</span>
  ),
  contentSize: () => (
    <span>
      Your resume should be fully completed and not left incomplete or partially
      done.
    </span>
  ),
  experience: () => (
    <span>
      At-least one project/experience with a sufficiently detailed description
      should be present in your resume.
    </span>
  ),
  projects: () => (
    <span>
      At-least one project/experience with a sufficiently detailed description
      should be present in your resume.
    </span>
  ),
  garbage_collection: () => (
    <span>All the details of the resume should be accurate.</span>
  ),
};

function BlockerPoints({ value }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { onEditResume } = useApplicationFormContext();
  const { analytics } = useJobPreview();
  const {
    resume_details,
    blocker_and_garbage_details,
    is_blocker,
    tech_stack_check,
  } = value || {};
  const { blockers, garbage_collection } = blocker_and_garbage_details || {};
  const { user_work_experiences, user_educations } = garbage_collection || {};
  const { id } = resume_details || {};
  let pointCount = Object.values(blockers).filter(Boolean).length;
  pointCount += tech_stack_check?.details?.length || 0;
  pointCount += user_work_experiences?.length || 0;
  pointCount += user_educations?.length || 0;

  const handleCollapse = () => {
    analytics?.click('Blocker Points - Collapse', PRODUCT_NAME);
    setIsCollapsed(!isCollapsed);
  };

  const handleEditResume = () => {
    analytics?.click('Blocker Points - Edit Resume', PRODUCT_NAME);
    onEditResume(id);
  };

  return (
    <Card size="small" rootClassName={styles.resumeChoiceOptionLabelCard}>
      <Flex gap={8} className={styles.resumeChoiceOptionLabelCardHeader}>
        {is_blocker && <ExclamationCircleTwoTone twoToneColor="#FAAD14" />}
        {!is_blocker && <CheckCircleTwoTone twoToneColor="#52c41a" />}
        <Typography.Text>
          {is_blocker
            ? `Improvements to be made (${pointCount})`
            : 'No improvements to be made'}
        </Typography.Text>
        <Button
          type="link"
          className={styles.resumeChoiceOptionLabelEditButton}
          onClick={handleEditResume}
        >
          Edit
        </Button>
        {is_blocker && (
          <Button
            type="text"
            className={styles.resumeChoiceOptionLabelCollapseButton}
            onClick={handleCollapse}
          >
            {isCollapsed ? <DownOutlined /> : <UpOutlined />}
          </Button>
        )}
      </Flex>
      {!isCollapsed && (
        <ul className={styles.resumeChoiceOptionLabelImprovementsList}>
          {Object.keys(blockers).map((blockerKey, index) => {
            if (!blockers[blockerKey]) return null;

            const blockerPointerText = RESUME_BLOCKER_POINTS[blockerKey];

            return <li key={index}>{blockerPointerText()}</li>;
          })}
          {tech_stack_check?.is_eligible === false && (
            <li key="skill-requirement">
              {tech_stack_check?.details?.map((detail, index) => {
                return (
                  <li key={index}>
                    Missing skill to be added: {detail.skill} (
                    {detail.proficiency_period}yr exp)
                  </li>
                );
              })}
            </li>
          )}
          {user_work_experiences?.length > 0 &&
            user_work_experiences.map((experience, index) => {
              return (
                <li key={index}>
                  Inaccurate work experience: {experience.company} -{' '}
                  {experience.job_title}
                </li>
              );
            })}
          {user_educations?.length > 0 &&
            user_educations.map((education, index) => {
              return (
                <li key={index}>
                  Inaccurate education: {education.university} -{' '}
                  {education.degree} ({education.branch})
                </li>
              );
            })}
        </ul>
      )}
    </Card>
  );
}

export default BlockerPoints;
