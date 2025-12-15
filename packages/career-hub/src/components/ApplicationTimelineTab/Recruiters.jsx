import React from 'react';
import { Avatar, Card, Space, Typography } from 'antd';
import { MailTwoTone } from '@ant-design/icons';
import { useJobPreview } from '../../contexts';
import styles from './ApplicationTimelineTab.module.scss';

const RecruiterCard = ({ recruiter }) => {
  const { name, avatar, email } = recruiter || {};

  return (
    <Card size="small">
      <Space direction="horizontal">
        <Avatar size={48} src={avatar} className={styles.recruiterAvatar} />
        <Space direction="vertical" className={styles.recruiterCardContent}>
          <Typography.Text className={styles.recruiterName}>
            {name}
          </Typography.Text>
          <Typography.Link
            className={styles.recruiterEmail}
            href={`mailto:${email}`}
          >
            <MailTwoTone />
            Send Email To Recruiter
          </Typography.Link>
        </Space>
      </Space>
    </Card>
  );
};

const Recruiters = () => {
  const { jobData } = useJobPreview();
  const { recruiters } = jobData || {};

  return (
    <Space>
      {recruiters.map((recruiter, index) => (
        <RecruiterCard key={index} recruiter={recruiter} />
      ))}
    </Space>
  );
};

export default Recruiters;
