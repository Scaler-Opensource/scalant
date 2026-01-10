import React from 'react';

import JobAlert from '../JobAlert/JobAlert';
import Sorting from '../Sorting/Sorting';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import styles from './Actions.module.scss';

function Actions() {
  return (
    <div className={styles.actions}>
      <JobAlert />
      <Sorting />
      <Filter />
      <Search />
    </div>
  );
}

export default Actions;
