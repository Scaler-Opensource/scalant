import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TagsSection from '../TagsSection';
import Actions from '../Actions';

import styles from './JobsHeader.module.scss';

function JobsHeader({ analytics, className }) {
  return (
    <div className={classNames(className, styles.jobsHeaderContainer)}>
      <TagsSection analytics={analytics} />
      <Actions analytics={analytics} />
    </div>
  );
}

JobsHeader.propTypes = {
  analytics: PropTypes.object,
  className: PropTypes.string,
};

JobsHeader.defaultProps = {
  className: '',
};

export default JobsHeader;
