import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './JobsLayout.module.scss';

function JobsLayout({ children, className }) {
  return (
    <div className={classNames(styles.jobsLayout, className)}>
      <div className={styles.jobsLayoutContainer}>
        {children}
      </div>
    </div>
  );
}

JobsLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

JobsLayout.defaultProps = {
  className: '',
};

export default JobsLayout;

