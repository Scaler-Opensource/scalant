import React from 'react';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './Sorting.module.scss';

function Sorting() {
  return (
    <Select
      className={styles.sorting}
      defaultValue="recent"
      suffixIcon={<DownOutlined />}
      options={[
        { value: 'recent', label: 'Sort by Recent' },
      ]}
    />
  );
}

export default Sorting;

