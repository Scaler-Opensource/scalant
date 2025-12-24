import React, { useState } from 'react';
import classNames from 'classnames';
import { Typography } from 'antd';
import { PRODUCT_NAME } from '../../utils/tracking';
import styles from './CollapsableContainer.module.scss';

const CollapsableContainer = ({ analytics, children, contentClassName }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    analytics?.click(
      `Collapsable Container - ${isExpanded ? 'View Less' : 'View More'}`,
      PRODUCT_NAME
    );
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.collapsableContainer}>
      <div
        className={classNames(contentClassName, {
          [styles.collapsed]: !isExpanded,
        })}
      >
        {children}
      </div>
      <Typography.Link className={styles.viewMore} onClick={handleToggle}>
        {isExpanded ? 'View Less' : 'View More'}
      </Typography.Link>
    </div>
  );
};

export default CollapsableContainer;
