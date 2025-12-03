// Career Hub Main Layout Component
// LLD: This is the main layout wrapper for all Career Hub pages
// It provides the structure: Header + Navigation + Content area
// Similar to ResumeLayout but adapted for job listings with different layouts

import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import TabsBar from '../../components/TabsBar';
import styles from './CareerHubLayout.module.scss';

const { Content } = Layout;

const CareerHubLayout = ({ children, initialData, jwt }) => {
  const location = useLocation();
  const isJobDetailPage = location.pathname.includes('/jobs/') && 
                          !location.pathname.endsWith('/all') &&
                          !location.pathname.endsWith('/saved') &&
                          !location.pathname.endsWith('/applied') &&
                          !location.pathname.endsWith('/relevant');

  return (
    <Layout className={styles.careerHubLayout}>
      {!isJobDetailPage && <TabsBar />}
      <Content className={styles.content}>
        <div className={styles.contentInner}>
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default CareerHubLayout;

