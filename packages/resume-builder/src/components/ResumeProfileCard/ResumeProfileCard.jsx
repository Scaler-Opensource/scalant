import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Avatar, Flex, Card, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { formatExperience } from '../../utils/resumeUtils';
import { setCurrentStep } from '../../store/resumeBuilderSlice';
import { RESUME_BUILDER_STEPS, STEPS_ORDER } from '../../utils/constants';

import styles from './ResumeProfileCard.module.scss';

const { Title, Text } = Typography;

const ResumeProfileCard = ({ className, resumePersonaData }) => {
  const dispatch = useDispatch();
  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );
  const fullName = resumeData?.personal_details?.name;

  const handleEditProfile = () => {
    dispatch(
      setCurrentStep(
        STEPS_ORDER.findIndex(
          (step) => step.key === RESUME_BUILDER_STEPS.PREFERENCE_SETTINGS.key
        )
      )
    );
  };

  if (!resumePersonaData) {
    return null;
  }
  const { currentJobRole, totalWorkExperienceInTech } = resumePersonaData;

  return (
    <Card className={className}>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={16}>
          <Avatar
            className={styles.avatar}
            size="large"
            icon={<UserOutlined />}
          />
          <Flex vertical>
            <Title level={5} style={{ marginBottom: 0 }}>
              {fullName}
            </Title>
            <Text type="secondary">
              {currentJobRole} |{' '}
              {formatExperience(
                totalWorkExperienceInTech.yearsExperienceInTech,
                totalWorkExperienceInTech.monthsExperienceInTech
              )}{' '}
              of Work experience
            </Text>
          </Flex>
        </Flex>
        <Button onClick={handleEditProfile}>Edit Preferences</Button>
      </Flex>
    </Card>
  );
};

export default ResumeProfileCard;
