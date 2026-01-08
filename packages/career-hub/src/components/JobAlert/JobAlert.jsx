import React from 'react';
import { AlertFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openJobAlertModal } from '../../store/dashboardSlice';
import { PRODUCT_NAME } from '../../utils/tracking';
import styles from './JobAlert.module.scss';

function JobAlert({ analytics }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    analytics?.click('Job Alert - Open Modal', PRODUCT_NAME);
    dispatch(openJobAlertModal());
  };

  return (
    <div className={styles.jobAlert} onClick={handleClick}>
      <AlertFilled className={styles.icon} />
      Job Alerts
    </div>
  );
}

export default JobAlert;
