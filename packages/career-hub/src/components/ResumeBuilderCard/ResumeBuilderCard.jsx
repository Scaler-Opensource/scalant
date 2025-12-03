import React from 'react';
import { Card, Button, Typography, Avatar } from 'antd';
import {
  BookOutlined,
  StarOutlined,
  FileTextOutlined,
  FolderOutlined,
  LineChartOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import styles from './ResumeBuilderCard.module.scss';

const { Title, Paragraph, Text } = Typography;

const ResumeBuilderCard = ({ onCreateResume, onGoToRepository }) => {
  const features = [
    {
      icon: <BookOutlined />,
      text: 'It is carefully curated by top industry recruiters and is ATS friendly',
    },
    {
      icon: <StarOutlined />,
      text: 'Includes analyzer to identify and suggest improvements and rephrasing assistance',
    },
    {
      icon: <FileTextOutlined />,
      text: 'Choose from templates that matches your preference',
    },
    {
      icon: <FolderOutlined />,
      text: 'Explore sample resumes from learners with similar backgrounds.',
    },
  ];

  return (
    <Card className={styles.resumeBuilderCard} bordered>
      <Title level={4} className={styles.cardTitle}>
        Create a Scaler Resume using our in-built resume builder to apply for jobs!
      </Title>

      <div className={styles.featuresList}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <Text className={styles.featureText}>{feature.text}</Text>
          </div>
        ))}
      </div>

      <div className={styles.actionButtons}>
        <Button
          type="primary"
          icon={<LineChartOutlined />}
          size="large"
          onClick={onCreateResume}
          className={styles.createButton}
        >
          Create your resume
        </Button>
        <Button
          icon={<CameraOutlined />}
          size="large"
          onClick={onGoToRepository}
          className={styles.repositoryButton}
        >
          Go to Resume Repository
        </Button>
      </div>

      <div className={styles.testimonial}>
        <Avatar size={32} className={styles.avatar}>
          U
        </Avatar>
        <Text className={styles.testimonialText}>
          "This resume builder guided me in creating an ATS-friendly, industry-standard resume
          and provided valuable suggestions that significantly improved my profile and helped me
          improve my chances"
        </Text>
      </div>
    </Card>
  );
};

export default ResumeBuilderCard;

