import React from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Tag, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { updateFormFilters } from '../../store/filterSlice';
import { useJobQueryParams } from '../../hooks';
import styles from './FilterTags.module.scss';

function FilterTags() {
  const dispatch = useDispatch();
  const { selectedJobId, updateJobId } = useJobQueryParams({
    syncFromURL: false,
  });

  const handleRemoveJobIdFilter = () => {
    updateJobId(null);
    dispatch(updateFormFilters({ job_ids: null }));
  };

  if (!selectedJobId) {
    return <div className={styles.container} />;
  }

  return (
    <Flex className={styles.container}>
      <Typography.Text className={styles.title}>Job Selected:</Typography.Text>
      <Tag
        color="blue"
        className={styles.tag}
        onClick={handleRemoveJobIdFilter}
      >
        {`ID#${selectedJobId}`}
        <CloseOutlined className={styles.closeIcon} />
      </Tag>
    </Flex>
  );
}

export default FilterTags;
