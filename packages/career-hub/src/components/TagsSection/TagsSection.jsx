import React, { useEffect } from 'react';
import { Tag } from 'antd';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setTab } from '../../store/filterSlice';
import { setProcessCounts } from '../../store/dashboardSlice';
import { useFetchProcessCountsQuery } from '../../services/dashboardService';
import {
  JOB_FILTER_TAGS,
  TAG_TO_TAB_MAPPING,
  COUNT_TO_TAB_MAPPING,
} from '../../utils/constants';

import styles from './TagsSection.module.scss';

function TagsSection() {
  const dispatch = useDispatch();
  const currentTab = useSelector(
    (state) => state.scalantCareerHub?.filter?.tab || 'all'
  );
  const processCounts = useSelector(
    (state) => state.scalantCareerHub?.dashboard?.processCounts || {}
  );

  const { data: countsData } = useFetchProcessCountsQuery();

  useEffect(() => {
    if (countsData) {
      dispatch(setProcessCounts(countsData));
    }
  }, [countsData, dispatch]);

  const handleTagClick = (tag) => {
    const tabValue = TAG_TO_TAB_MAPPING[tag];
    if (tabValue) {
      dispatch(setTab(tabValue));
    }
  };

  const isTagActive = (tag) => {
    const tabValue = TAG_TO_TAB_MAPPING[tag];
    return currentTab === tabValue;
  };

  const getCountForTag = (tag) => {
    const countKey = COUNT_TO_TAB_MAPPING[tag];
    return processCounts[countKey] || 0;
  };

  return (
    <div className={styles.tagsSection}>
      {Object.keys(JOB_FILTER_TAGS).map((tag) => (
        <Tag
          className={classNames(styles.tag, {
            [styles.activeTag]: isTagActive(tag),
          })}
          key={tag}
          onClick={() => handleTagClick(tag)}
        >
          {React.createElement(JOB_FILTER_TAGS[tag].icon, {
            className: styles.icon,
          })}
          {JOB_FILTER_TAGS[tag].label}{' '}
          <span className={styles.count}>({getCountForTag(tag)})</span>
        </Tag>
      ))}
    </div>
  );
}

export default TagsSection;
