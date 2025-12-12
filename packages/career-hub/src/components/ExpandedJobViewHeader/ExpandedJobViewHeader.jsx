import React from 'react';
import Actions from './Actions';
import BasicInfo from './BasicInfo';
import ExtraDetails from './ExtraDetails';
import styles from './ExpandedJobViewHeader.module.scss';

const ExpandedJobViewHeader = () => {
  return (
    <div className={styles.container}>
      <BasicInfo />
      <ExtraDetails />
      <Actions />
    </div>
  );
};

export default ExpandedJobViewHeader;
