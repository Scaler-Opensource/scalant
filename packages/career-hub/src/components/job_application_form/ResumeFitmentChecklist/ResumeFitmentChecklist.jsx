import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification, Flex, Typography, Button, Checkbox } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { PRODUCT_NAME } from '../../../utils/tracking';
import { useJobPreview } from '../../../contexts';
import { setChecklistOpen } from '../../../store/resumeFitmentSlice';
import styles from './ResumeFitmentChecklist.module.scss';

const NOTIFICATION_KEY = 'resume-fitment-checklist';

const Description = () => {
  const { activeResumeChecklist } =
    useSelector((state) => state.scalantCareerHub.resumeFitment) || {};

  return (
    <Flex vertical gap={8}>
      {activeResumeChecklist.map((item, index) => (
        <Checkbox>
          <Typography.Text key={index}>{item}</Typography.Text>
        </Checkbox>
      ))}
    </Flex>
  );
};

const Footer = ({ closeNotification }) => {
  return (
    <Flex justify="space-between" className={styles.footer}>
      <Flex gap={4} align="center">
        <CheckCircleFilled style={{ color: '#20A164' }} />
        <Typography.Text className={styles.footerText}>
          When your resume is ready
        </Typography.Text>
      </Flex>
      <Button type="primary" onClick={closeNotification}>
        Proceed to Apply
      </Button>
    </Flex>
  );
};

function ResumeFitmentChecklist() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const { activeResumeChecklist, activeResumeName, isChecklistOpen } =
    useSelector((state) => state.scalantCareerHub.resumeFitment) || {};
  const { setActiveApplicationId, jobId, analytics } = useJobPreview();

  const closeNotification = useCallback(() => {
    api.destroy(NOTIFICATION_KEY);
    setActiveApplicationId(jobId);
    dispatch(setChecklistOpen({ isOpen: false }));

    analytics?.click('Resume Fitment Checklist - Close', PRODUCT_NAME);
  }, [analytics, dispatch, jobId, setActiveApplicationId, api]);

  const openNotification = useCallback(() => {
    if (!activeResumeName || !activeResumeChecklist?.length) {
      return;
    }

    api.warning({
      key: NOTIFICATION_KEY,
      message: activeResumeName,
      placement: 'bottomRight',
      description: <Description />,
      onClose: closeNotification,
      closeIcon: null,
      duration: null,
      btn: <Footer closeNotification={closeNotification} />,
      className: styles.container,
    });

    analytics?.click('Resume Fitment Checklist - Open', PRODUCT_NAME);
  }, [
    activeResumeChecklist,
    activeResumeName,
    api,
    closeNotification,
    analytics,
  ]);

  useEffect(() => {
    if (isChecklistOpen) {
      openNotification();
    } else {
      closeNotification();
    }
  }, [isChecklistOpen, openNotification, closeNotification]);

  return contextHolder;
}

export default ResumeFitmentChecklist;
