import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function ProfileDetails({ className }) {
  const userProfileData = useSelector(
    (state) => state.scalantCareerHub.dashboard.userProfileData
  );

  return (
    <div className={className}>
      <h1 style={{ textAlign: 'center' }}>Profile Details</h1>
      {userProfileData && (
        <div style={{ padding: '1rem' }}>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px',
              maxHeight: '80vh',
            }}
          >
            {JSON.stringify(userProfileData, null, 2)}
          </pre>
        </div>
      )}
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
