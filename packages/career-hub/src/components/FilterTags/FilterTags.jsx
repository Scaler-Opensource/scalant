import React from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Tag, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { updateFormFilters } from '../../store/filterSlice';
import { useJobQueryParams } from '../../hooks';
import { PRODUCT_NAME } from '../../utils/tracking';
import styles from './FilterTags.module.scss';

function FilterTags({ analytics }) {
  const dispatch = useDispatch();
  const { selectedJobId, updateJobId } = useJobQueryParams({
    syncFromURL: false,
  });

  const handleRemoveJobIdFilter = () => {
    analytics?.click('Filter Tags - Remove Job Filter', PRODUCT_NAME);
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
