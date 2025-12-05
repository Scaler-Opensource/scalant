import React from 'react';
import PropTypes from 'prop-types';

function JobsHeader({ className }) {
  return (
    <div className={className}>
      <h1 style={{ textAlign: 'center' }}>Jobs Header</h1>
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

