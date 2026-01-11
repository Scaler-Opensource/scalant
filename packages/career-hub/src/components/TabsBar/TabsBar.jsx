import React from 'react';
import { Tabs } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAVIGATION_TABS, ROUTES } from '../../utils/constants';
import styles from './TabsBar.module.scss';

const TabsBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === ROUTES.HOME) return NAVIGATION_TABS.HOME;
    if (location.pathname.startsWith(ROUTES.JOBS)) return NAVIGATION_TABS.JOBS;
    if (location.pathname === ROUTES.MY_RESUME) return NAVIGATION_TABS.MY_RESUME;
    if (location.pathname === ROUTES.PREFERENCES) return NAVIGATION_TABS.PREFERENCES;
    return NAVIGATION_TABS.HOME;
  };

  const handleTabChange = (key) => {
    if (key === NAVIGATION_TABS.HOME) {
      navigate(ROUTES.HOME);
    } else if (key === NAVIGATION_TABS.JOBS) {
      navigate(ROUTES.ALL_JOBS);
    } else if (key === NAVIGATION_TABS.MY_RESUME) {
      navigate(ROUTES.MY_RESUME);
    } else if (key === NAVIGATION_TABS.PREFERENCES) {
      navigate(ROUTES.PREFERENCES);
    }
  };

  return (
    <div className={styles.tabsBar}>
      <div className={styles.logoSection}>
        <AppstoreOutlined className={styles.logoIcon} />
        <span className={styles.logoText}>Career's Hub</span>
      </div>
      <Tabs
        activeKey={getActiveTab()}
        onChange={handleTabChange}
        className={styles.navTabs}
        items={[
          { key: NAVIGATION_TABS.HOME, label: 'Home' },
          { key: NAVIGATION_TABS.JOBS, label: 'Jobs' },
          { key: NAVIGATION_TABS.MY_RESUME, label: 'My Resume' },
          { key: NAVIGATION_TABS.PREFERENCES, label: 'Preferences' },
        ]}
      />
    </div>
  );
};

export default TabsBar;

