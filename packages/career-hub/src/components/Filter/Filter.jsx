import React from 'react';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openFilterModal } from '../../store/dashboardSlice';
import { PRODUCT_NAME } from '../../utils/tracking';
import styles from './Filter.module.scss';

function Filter({ analytics }) {
  const dispatch = useDispatch();

  const showDrawer = () => {
    analytics?.click('Filter - Open Drawer', PRODUCT_NAME);
    dispatch(openFilterModal());
  };

  return (
    <Button type="primary" className={styles.filter} onClick={showDrawer}>
      Filters <DownOutlined />
    </Button>
  );
}

export default Filter;
