import React, { useState } from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';

import styles from './CollapsableHTML.module.scss';

const CollapsableHTML = ({ html, contentClassName }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.collapsableContainer}>
      <div
        className={classNames(contentClassName, {
          [styles.collapsed]: !isExpanded,
        })}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Typography.Link
        className={styles.viewMore}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'View Less' : 'View More'}
      </Typography.Link>
    </div>
  );
};

export default CollapsableHTML;
