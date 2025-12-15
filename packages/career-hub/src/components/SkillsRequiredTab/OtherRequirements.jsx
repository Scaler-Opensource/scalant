import React from 'react';
import { Table, Tag, Typography } from 'antd';
import { toTitleCase } from '../../utils/caseUtil';
import { useJobPreview } from '../../contexts';
import { ADDITIONAL_ELIGIBILITY_MAPPING } from '../../utils/requirements';

const STATUS_MAP = {
  eligible: 'Eligible',
  ineligible: 'Ineligible',
};

const columns = [
  {
    title: 'Requirement',
    dataIndex: 'requirement',
  },
  {
    title: 'Details',
    dataIndex: 'details',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const StatusColumnContent = ({ status }) => {
  if (status === STATUS_MAP.eligible) {
    return <Tag color="success">Eligible</Tag>;
  }

  return <Tag color="error">Ineligible</Tag>;
};

const OtherRequirements = () => {
  const { jobData } = useJobPreview();
  const { eligibilityCriteria } = jobData || {};
  const { reasons } = eligibilityCriteria || {};

  const otherReasons = reasons?.filter(
    (reason) => reason.label !== 'skills' && reason.showText
  );

  if (!otherReasons) {
    return null;
  }

  const dataSource = otherReasons.map((value) => {
    const status = value.isEligible
      ? STATUS_MAP.eligible
      : STATUS_MAP.ineligible;

    return {
      requirement: toTitleCase(value.label),
      details: ADDITIONAL_ELIGIBILITY_MAPPING[value.label](jobData),
      status: <StatusColumnContent status={status} />,
    };
  });

  return (
    <Table
      title={() => (
        <Typography.Text strong>
          Skills and Toolsets in your Resume
        </Typography.Text>
      )}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );
};

export default OtherRequirements;
