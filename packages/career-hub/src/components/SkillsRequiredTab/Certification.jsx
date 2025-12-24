import React from 'react';
import classNames from 'classnames';
import { Space, Table, Tag, Typography } from 'antd';
import { useJobPreview } from '../../contexts';
import { PRODUCT_NAME } from '../../utils/tracking';
import styles from './SkillsRequiredTab.module.scss';

const STATUS_MAP = {
  completed: 'Completed',
  pending: 'Pending',
  notRequired: 'Not Required',
};

const columns = [
  {
    title: 'Skill Type',
    dataIndex: 'skillType',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Contests',
    dataIndex: 'contests',
  },
  {
    title: 'Mock Interview',
    dataIndex: 'mockInterview',
  },
];

const StatusColumnContent = ({ status }) => {
  return (
    <Tag color={status === STATUS_MAP.completed ? 'success' : 'warning'}>
      {status}
    </Tag>
  );
};

const ContestColumnContent = ({ contestDetails }) => {
  const { analytics } = useJobPreview();

  if (!contestDetails) {
    return STATUS_MAP.notRequired;
  }

  const { cleared, joinLink } = contestDetails;

  const handleClick = () => {
    analytics?.click('Certification - Attempt Contest', PRODUCT_NAME);
  };

  if (!cleared) {
    return (
      <Typography.Link href={joinLink} onClick={handleClick} underline>
        Attempt Contest
      </Typography.Link>
    );
  }

  return (
    <Space>
      <div className={classNames(styles.dot, styles.successDot)} />
      <Typography.Text>Success</Typography.Text>
    </Space>
  );
};

const MockInterviewColumnContent = ({
  mockInterviewDetails,
  skillId,
  skillName,
}) => {
  const { openMockInterviewModal, analytics } = useJobPreview();
  if (!mockInterviewDetails) {
    return STATUS_MAP.notRequired;
  }

  const { cleared } = mockInterviewDetails;

  const handleClick = () => {
    analytics?.click('Certification - Schedule Interview', PRODUCT_NAME);
    openMockInterviewModal(skillId, skillName);
  };

  if (!cleared) {
    return (
      <Typography.Link onClick={handleClick} underline>
        Schedule Interview
      </Typography.Link>
    );
  }

  return (
    <Space>
      <div className={classNames(styles.dot, styles.successDot)} />
      <Typography.Text>Success</Typography.Text>
    </Space>
  );
};

const Certification = () => {
  const { jobData } = useJobPreview();
  const { eligibilityCriteria } = jobData || {};
  const { reasons } = eligibilityCriteria || {};

  const certificationReasons = reasons?.find(
    (reason) => reason.label === 'skills'
  );

  if (!certificationReasons) {
    return null;
  }

  const dataSource = Object.entries(certificationReasons.data).map(
    ([key, value]) => {
      const contests = value.contests;
      const contestsStatus = contests
        ? value.contests.cleared
          ? STATUS_MAP.completed
          : STATUS_MAP.pending
        : STATUS_MAP.notRequired;
      const mockInterview = value.skills;
      const mockInterviewStatus = mockInterview
        ? value.skills.cleared
          ? STATUS_MAP.completed
          : STATUS_MAP.pending
        : STATUS_MAP.notRequired;
      const status = [contestsStatus, mockInterviewStatus].every(
        (status) => status !== STATUS_MAP.pending
      )
        ? STATUS_MAP.completed
        : STATUS_MAP.pending;

      return {
        skillType: key,
        status: <StatusColumnContent status={status} />,
        contests: <ContestColumnContent contestDetails={contests} />,
        mockInterview: (
          <MockInterviewColumnContent
            mockInterviewDetails={mockInterview}
            skillId={value.skillId}
            skillName={value.skillName}
          />
        ),
      };
    }
  );

  return (
    <Table
      title={() => (
        <Typography.Text className={styles.tableTitle} strong>
          Scaler certifications you need to apply
        </Typography.Text>
      )}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );
};

export default Certification;
