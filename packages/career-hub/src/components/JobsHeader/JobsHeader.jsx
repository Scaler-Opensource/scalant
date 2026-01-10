import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TagsSection from '../TagsSection';
import Actions from '../Actions';

import styles from './JobsHeader.module.scss';

function JobsHeader({ className }) {
  return (
    <div className={classNames(className, styles.jobsHeaderContainer)}>
      <TagsSection />
      <Actions />
    </div>
  );
}

JobsHeader.propTypes = {
  className: PropTypes.string,
};

JobsHeader.defaultProps = {
  className: '',
};

export default JobsHeader;
