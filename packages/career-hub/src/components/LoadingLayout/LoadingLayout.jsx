// Loading Layout Component
// LLD: Generic loading component shown while data is being fetched
// Used across all pages as a loading fallback

import React from 'react';
import { Spin } from 'antd';
import styles from './LoadingLayout.module.scss';

// LLD: LoadingLayout Component
const LoadingLayout = () => {
  return (
    <div className={styles.loadingLayout}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingLayout;

