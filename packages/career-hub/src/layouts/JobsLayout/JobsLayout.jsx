import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import FilterTags from '../../components/FilterTags';

import styles from './JobsLayout.module.scss';

const { Header, Sider, Content } = Layout;
function JobsLayout({
  analytics,
  header,
  children,
  className,
  sider,
  siderWidth,
}) {
  return (
    <Layout className={className}>
      <Header className={styles.header}>{header || 'Header'}</Header>
      <FilterTags analytics={analytics} />
      <Layout className={styles.layout}>
        <Content className={styles.content}>{children}</Content>
        {sider && (
          <Sider className={styles.sider} width={siderWidth || '25%'}>
            {sider}
          </Sider>
        )}
      </Layout>
    </Layout>
  );
}

JobsLayout.propTypes = {
  analytics: PropTypes.object,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  sider: PropTypes.node,
  siderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

JobsLayout.defaultProps = {
  className: '',
  sider: null,
  siderWidth: '25%',
};

export default JobsLayout;
