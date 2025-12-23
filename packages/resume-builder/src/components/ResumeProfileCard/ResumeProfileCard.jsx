import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Avatar, Flex, Card, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { formatExperience } from '../../utils/resumeUtils';
import {
  setCurrentStep,
  setIsEditingPreferences,
} from '../../store/resumeBuilderSlice';
import { RESUME_BUILDER_STEPS, STEPS_ORDER } from '../../utils/constants';

import styles from './ResumeProfileCard.module.scss';

const { Title, Text } = Typography;

const ResumeProfileCard = ({ className, resumePersonaData }) => {
  const dispatch = useDispatch();
  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );
  const steps = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.steps
  );
  const fullName = resumeData?.personal_details?.name;
  const jobTitleFromApi = resumeData?.personal_details?.job_title;

  const handleEditProfile = () => {
    dispatch(setIsEditingPreferences(true));
    dispatch(
      setCurrentStep(
        steps.findIndex(
          (step) => step.key === RESUME_BUILDER_STEPS.PREFERENCE_SETTINGS.key
        )
      )
    );
  };

  if (!resumePersonaData && !resumeData?.personal_details) {
    return null;
  }

  // Determine job title with API fallback
  const jobTitle =
    resumePersonaData?.currentJobRole || jobTitleFromApi || '';

  // Determine experience in tech with API fallback (expects years/months)
  const experienceInTechMonths = resumeData?.personal_details?.experience;
  const experienceFromPersona = resumePersonaData?.totalWorkExperienceInTech;
  const yearsExperienceInTech =
    experienceFromPersona?.yearsExperienceInTech ??
    (typeof experienceInTechMonths === 'number'
      ? Math.floor(experienceInTechMonths / 12)
      : 0);
  const monthsExperienceInTech =
    experienceFromPersona?.monthsExperienceInTech ??
    (typeof experienceInTechMonths === 'number'
      ? experienceInTechMonths % 12
      : 0);

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
              {jobTitle} |{' '}
              {formatExperience(
                yearsExperienceInTech,
                monthsExperienceInTech
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
