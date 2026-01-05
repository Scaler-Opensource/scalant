import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Flex, Typography } from 'antd';
import {
  CheckCircleTwoTone,
  DownOutlined,
  ExclamationCircleTwoTone,
  UpOutlined,
} from '@ant-design/icons';
import { PRODUCT_NAME } from '../../../utils/tracking';
import { useApplicationFormContext, useJobPreview } from '../../../contexts';
import { getBlockerPointsList } from '../../../utils/resumeUtils';
import {
  setActiveResume,
  setChecklistOpen,
} from '../../../store/resumeFitmentSlice';
import styles from './ResumeChoiceSelect.module.scss';

function BlockerPoints({ value }) {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { onEditResume, jobProfileId } = useApplicationFormContext();
  const { analytics } = useJobPreview();
  const { resume_details, is_blocker } = value || {};
  const { id, name } = resume_details || {};
  const blockerPointsList = getBlockerPointsList(value);
  const pointCount = blockerPointsList.length;

  const handleCollapse = () => {
    analytics?.click('Blocker Points - Collapse', PRODUCT_NAME);
    setIsCollapsed(!isCollapsed);
  };

  const handleEditResume = () => {
    analytics?.click('Blocker Points - Edit Resume', PRODUCT_NAME);
    onEditResume(id);
    dispatch(
      setActiveResume({
        jobProfileId,
        resumeId: id,
        blockerPoints: blockerPointsList,
        resumeName: name,
      })
    );
    dispatch(setChecklistOpen({ syncWithBlockerPoints: true }));
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
          {blockerPointsList.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default BlockerPoints;
