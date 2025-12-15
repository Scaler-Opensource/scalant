import React, { useState } from 'react';
import classNames from 'classnames';
import { Typography } from 'antd';
import styles from './CollapsableContainer.module.scss';

const CollapsableContainer = ({ children, contentClassName }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.collapsableContainer}>
      <div
        className={classNames(contentClassName, {
          [styles.collapsed]: !isExpanded,
        })}
      >
        {children}
      </div>
      <Typography.Link
        className={styles.viewMore}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'View Less' : 'View More'}
      </Typography.Link>
    </div>
  );
};

export default CollapsableContainer;
