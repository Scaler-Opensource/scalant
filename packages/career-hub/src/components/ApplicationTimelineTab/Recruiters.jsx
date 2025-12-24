import React from 'react';
import { Avatar, Card, Space, Typography } from 'antd';
import { MailTwoTone } from '@ant-design/icons';
import { useJobPreview } from '../../contexts';
import { PRODUCT_NAME } from '../../utils/tracking';
import styles from './ApplicationTimelineTab.module.scss';

const RecruiterCard = ({ recruiter }) => {
  const { name, avatar, email } = recruiter || {};
  const { analytics } = useJobPreview();

  const handleSendEmail = () => {
    analytics?.click('Recruiter - Send Email', PRODUCT_NAME, {
      recruiterName: name,
      recruiterEmail: email,
    });
  };

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
            onClick={handleSendEmail}
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
