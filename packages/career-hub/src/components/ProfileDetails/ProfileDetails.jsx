import React from 'react';
import PropTypes from 'prop-types';

function ProfileDetails({ className }) {
  return (
    <div className={className}>
      <h1 style={{ textAlign: 'center' }}>Profile Details</h1>
    </div>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

ProfileDetails.defaultProps = {
  className: '',
};

export default ProfileDetails;


