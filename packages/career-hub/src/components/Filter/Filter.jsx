import React from 'react';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openFilterModal } from '../../store/dashboardSlice';
import styles from './Filter.module.scss';

function Filter() {
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch(openFilterModal());
  };

  return (
    <Button type="primary" className={styles.filter} onClick={showDrawer}>
      Filters <DownOutlined />
    </Button>
  );
}

export default Filter;
