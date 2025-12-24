import React from 'react';
import PropTypes from 'prop-types';

import JobAlert from '../JobAlert/JobAlert';
import Sorting from '../Sorting/Sorting';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import styles from './Actions.module.scss';

function Actions({ analytics }) {
  return (
    <div className={styles.actions}>
      <JobAlert analytics={analytics} />
      <Sorting />
      <Filter analytics={analytics} />
      <Search analytics={analytics} />
    </div>
  );
}

Actions.propTypes = {
  analytics: PropTypes.object,
};

export default Actions;
