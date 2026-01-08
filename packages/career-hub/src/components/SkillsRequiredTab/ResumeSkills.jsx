import React from 'react';
import classNames from 'classnames';
import { Space, Table, Typography } from 'antd';
import { useJobPreview } from '../../contexts';
import { PRODUCT_NAME } from '../../utils/tracking';
import styles from './SkillsRequiredTab.module.scss';

const STATUS_MAP = {
  added: 'Added',
  missing: 'Missing',
};

const columns = [
  {
    title: 'Stack Type',
    dataIndex: 'stackType',
  },
  {
    title: 'Experience (Yrs)',
    dataIndex: 'experience',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: '',
    dataIndex: 'action',
  },
];

const StatusColumnContent = ({ status }) => {
  return (
    <Space>
      <div
        className={classNames(styles.dot, {
          [styles.successDot]: status === STATUS_MAP.added,
          [styles.errorDot]: status === STATUS_MAP.missing,
        })}
      />
      <Typography.Text>{status}</Typography.Text>
    </Space>
  );
};

const ActionColumnContent = ({ status }) => {
  const { openResume, analytics } = useJobPreview();

  const handleClick = () => {
    analytics?.click('Resume Skills - Add Skill', PRODUCT_NAME);
    openResume();
  };

  if (status === STATUS_MAP.added) {
    return null;
  }

  return (
    <Typography.Link onClick={handleClick} underline>
      Add Skill
    </Typography.Link>
  );
};

const ResumeSkills = () => {
  const { jobData } = useJobPreview();
  const { eligibilityCriteria } = jobData || {};
  const { reasons } = eligibilityCriteria || {};

  const techStackReasons = reasons?.find(
    (reason) => reason.label === 'tech_stacks'
  );

  if (!techStackReasons?.data) {
    return null;
  }

  const dataSource = Object.entries(techStackReasons.data).map(
    ([key, value]) => {
      const status = value.data?.cleared
        ? STATUS_MAP.added
        : STATUS_MAP.missing;

      return {
        stackType: key,
        experience: `${Math.floor(value.proficiencyPeriod / 12)}+`,
        status: <StatusColumnContent status={status} />,
        action: <ActionColumnContent status={status} />,
      };
    }
  );

  return (
    <Table
      title={() => (
        <Typography.Text className={styles.tableTitle} strong>
          Skills and Toolsets in your Resume
        </Typography.Text>
      )}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );
};

export default ResumeSkills;
