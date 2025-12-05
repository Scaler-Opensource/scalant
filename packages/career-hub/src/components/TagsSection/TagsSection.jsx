import React from 'react';
import { Tag } from 'antd';
import classNames from 'classnames';

import { JOB_FILTER_TAGS } from '../../utils/constants';

import styles from './TagsSection.module.scss';

const DUMMY_COUNTS = {
  relevant: 10,
  all: 100,
  saved: 10,
  applied: 10,
};

function TagsSection() {
  return (
    <div className={styles.tagsSection}>
      {Object.keys(JOB_FILTER_TAGS).map((tag) => (
        <Tag
          className={classNames(styles.tag, {
            [styles.activeTag]: tag === 'relevant',
          })}
          key={tag}
        >
          {React.createElement(JOB_FILTER_TAGS[tag].icon, {
            className: styles.icon,
          })}
          {JOB_FILTER_TAGS[tag].label}{' '}
          <span className={styles.count}>({DUMMY_COUNTS[tag]})</span>
        </Tag>
      ))}
    </div>
  );
}

export default TagsSection;
