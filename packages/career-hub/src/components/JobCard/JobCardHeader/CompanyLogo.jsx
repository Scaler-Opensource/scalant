import React, { useState } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import missingLogo from '../images/missing.png';

/**
 * Company Logo component with fallback logic
 * Reference: frontend/src/modules/job_tracker/components/jobList/components/job_card/JobCardHeader.js (lines 34-54)
 * 
 * Fallback priority:
 * 1. jobData.logo
 * 2. companiesList[company[0]]?.logo
 * 3. Fallback image
 */
const CompanyLogo = ({ logo, company, companiesList, companyName }) => {
  const [logoSrc, setLogoSrc] = useState(() => {
    // Priority 1: jobData.logo
    if (logo) return logo;
    
    // Priority 2: companiesList[company[0]]?.logo
    if (company && company[0] && companiesList[company[0]]?.logo) {
      return companiesList[company[0]].logo;
    }
    
    // Priority 3: Fallback
    return missingLogo;
  });

  const handleError = () => {
    setLogoSrc(missingLogo);
  };

  return (
    <Avatar
      size={48}
      src={logoSrc}
      alt={companyName}
      onError={handleError}
      shape="square"
    />
  );
};

CompanyLogo.propTypes = {
  logo: PropTypes.string,
  company: PropTypes.arrayOf(PropTypes.number),
  companiesList: PropTypes.object,
  companyName: PropTypes.string
};

CompanyLogo.defaultProps = {
  logo: null,
  company: [],
  companiesList: {},
  companyName: ''
};

export default CompanyLogo;
