import React from 'react';
import { AlertFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openJobAlertModal } from '../../store/dashboardSlice';

import styles from './JobAlert.module.scss';

function JobAlert() {
  const dispatch = useDispatch();

  const handleClick = () => {
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
