import React from 'react';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './Filter.module.scss';

function Filter() {
  return (
    <Button type="primary" className={styles.filter}>
      Filters <DownOutlined />
    </Button>
  );
}

export default Filter;

