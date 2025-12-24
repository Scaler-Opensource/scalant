import React, { useState } from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';
import { PRODUCT_NAME } from '../../utils/tracking';
import styles from './CollapsableHTML.module.scss';

const CollapsableHTML = ({ analytics, html, contentClassName }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    analytics?.click(
      `Collapsable HTML - ${isExpanded ? 'View Less' : 'View More'}`,
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
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Typography.Link className={styles.viewMore} onClick={handleToggle}>
        {isExpanded ? 'View Less' : 'View More'}
      </Typography.Link>
    </div>
  );
};

export default CollapsableHTML;
