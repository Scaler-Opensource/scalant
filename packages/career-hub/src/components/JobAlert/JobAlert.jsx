import React from 'react';
import { AlertFilled } from '@ant-design/icons';

import styles from './JobAlert.module.scss';

function JobAlert() {
  return (
    <div className={styles.jobAlert}>
      <AlertFilled className={styles.icon} />
      Job Alerts
    </div>
  );
}

export default JobAlert;
