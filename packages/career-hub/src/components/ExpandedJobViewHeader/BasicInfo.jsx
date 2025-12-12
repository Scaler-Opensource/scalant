import React from 'react';
import { Typography } from 'antd';
import { formatLocation } from '../../utils/jobCard';
import { useJobPreview } from '../../contexts';
import CompanyLogo from '../CompanyLogo';
import styles from './ExpandedJobViewHeader.module.scss';

const CompanyInfo = () => {
  const { companyData } = useJobPreview();
  const { logo, name } = companyData || {};

  return (
    <div className={styles.companyInfo}>
      <CompanyLogo logo={logo} companyName={name} size={50} />
      <div className={styles.companyName}>{name}</div>
    </div>
  );
};

const JobTitle = () => {
  const { jobData } = useJobPreview();
  const { title } = jobData || {};

  return (
    <Typography.Text ellipsis className={styles.jobTitle}>
      {title}
    </Typography.Text>
  );
};

const JobLocation = () => {
  const { jobData } = useJobPreview();
  const { preferredCities } = jobData || {};
  const location = formatLocation(preferredCities);

  return <div className={styles.jobLocation}>{location}</div>;
};

const BasicInfo = () => {
  return (
    <div className={styles.basicInfo}>
      <CompanyInfo />
      <JobTitle />
      <JobLocation />
    </div>
  );
};

export default BasicInfo;
