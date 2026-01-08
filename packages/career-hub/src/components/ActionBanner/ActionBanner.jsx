import React from 'react';
import classnames from 'classnames';
import { Button } from 'antd';

import styles from './ActionBanner.module.scss';

const ActionBanner = ({
  icon,
  title,
  description,
  buttonText,
  buttonIcon,
  className,
  onClick,
  isLoading,
}) => {
  return (
    <div className={classnames(styles.actionBanner, className)}>
      {icon}
      <div className={styles.actionBannerContent}>
        <span className={styles.actionBannerTitle}>{title}</span>
        <span className={styles.actionBannerDescription}>{description}</span>
      </div>
      <Button
        icon={buttonIcon}
        type="primary"
        className={styles.actionBannerButton}
        onClick={onClick}
        loading={isLoading}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ActionBanner;
