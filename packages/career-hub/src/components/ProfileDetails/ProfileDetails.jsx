import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Avatar, Typography, Flex, Divider, Tag, Select } from 'antd';
import {
  UserOutlined,
  StarOutlined,
  FileTextTwoTone,
  EditTwoTone,
} from '@ant-design/icons';
import { formatExperience } from '../../utils/stringUtil';
import { toTitleCase } from '../../utils/caseUtil';
import {
  parsePreferredLocations,
  parsePreferredJobRoles,
} from '../../utils/profileUtil';
import { PRODUCT_NAME } from '../../utils/tracking';
import { useUpdateJobStatusMutation } from '../../services/dashboardService';
import styles from './ProfileDetails.module.scss';

// Mapping constants for placement intent
const DISPLAY_LABEL_TO_STATUS = {
  'Looking for a job': 'active',
  'Not looking for a job': 'inactive',
  'Need time to prepare': 'need_time',
};

const STATUS_TO_PLACEMENT_INTENT = {
  active: 'Interested',
  inactive: 'Not Interested',
  need_time: 'Need Time to Prepare',
};

const PLACEMENT_INTENT_TO_DISPLAY_LABEL = {
  Interested: 'Looking for a job',
  'Need Time to Prepare': 'Need time to prepare',
  'Not Interested': 'Not looking for a job',
};

const JOB_INTENT_OPTIONS = [
  {
    label: 'Looking for a job',
    value: 'Looking for a job',
  },
  {
    label: 'Need time to prepare',
    value: 'Need time to prepare',
  },
  {
    label: 'Not looking for a job',
    value: 'Not looking for a job',
  },
];

function ProfileDetails({
  analytics,
  className,
  onViewResume,
  onEditPreferences,
}) {
  const userProfileData = useSelector(
    (state) => state.scalantCareerHub.dashboard.userProfileData
  );

  const [updateJobStatus, { isLoading: isUpdatingStatus }] =
    useUpdateJobStatusMutation();
  const [placementIntent, setPlacementIntent] = useState(
    userProfileData?.placementIntent || null
  );

  useEffect(() => {
    if (userProfileData?.placementIntent) {
      setPlacementIntent(userProfileData.placementIntent);
    }
  }, [userProfileData?.placementIntent]);

  const handleViewResume = () => {
    analytics?.click('Profile Details - View Resume', PRODUCT_NAME);
    onViewResume?.();
  };

  const handleEditPreferences = () => {
    analytics?.click('Profile Details - Edit Preferences', PRODUCT_NAME);
    onEditPreferences?.();
  };

  const handleJobStatusChange = async (value) => {
    try {
      const status = DISPLAY_LABEL_TO_STATUS[value];
      if (status) {
        await updateJobStatus({
          source: 'careers_hub',
          status: status,
        }).unwrap();
        setPlacementIntent(STATUS_TO_PLACEMENT_INTENT[status]);
      }
    } catch (error) {
      // Error handling - could show a notification to user
      // eslint-disable-next-line no-console, no-undef
      console.error('Failed to update job status:', error);
    }
  };

  const getDisplayLabel = (intent) => {
    return PLACEMENT_INTENT_TO_DISPLAY_LABEL[intent] || null;
  };

  return (
    <div className={classNames(styles.profileDetails, className)}>
      <Flex align="center" gap={8}>
        <Avatar shape="square" size={48} src={userProfileData?.avatar} />
        <Flex justify="center" vertical gap={4}>
          <Typography.Title level={5} className={styles.profileName}>
            {userProfileData?.name}
          </Typography.Title>
          <Typography.Text type="secondary">
            {toTitleCase(userProfileData?.mentee?.careersHubProduct)}
          </Typography.Text>
        </Flex>
      </Flex>
      <Flex vertical gap={8} className={styles.profileDetailsItems}>
        <Flex align="center" gap={10}>
          <UserOutlined />
          <Typography.Text>{userProfileData?.jobTitle}</Typography.Text>
        </Flex>
        <Flex align="center" gap={10}>
          <StarOutlined />
          <Typography.Text>
            {formatExperience(
              userProfileData?.experienceYears ??
                userProfileData?.experienceInYears,
              userProfileData?.experienceMonths ??
                userProfileData?.experienceInMonths
            )}
          </Typography.Text>
        </Flex>
        <Flex align="center" gap={10}>
          <FileTextTwoTone />
          <Typography.Link onClick={handleViewResume}>
            View Resume
          </Typography.Link>
        </Flex>
        <Flex vertical className={styles.jobIntentContainer} gap={8}>
          <Typography.Text secondary>
            Select your intent in Career's Hub
          </Typography.Text>
          <Select
            placeholder="Select your intent"
            value={getDisplayLabel(placementIntent)}
            onChange={handleJobStatusChange}
            disabled={isUpdatingStatus}
            loading={isUpdatingStatus}
            style={{ width: '100%' }}
            options={JOB_INTENT_OPTIONS}
          />
        </Flex>
      </Flex>
      <Flex vertical className={styles.preferencesContainer}>
        <Flex justify="space-between">
          <Typography.Title level={5} className={styles.preferencesTitle}>
            Your Preferences
          </Typography.Title>

          <EditTwoTone onClick={handleEditPreferences} />
        </Flex>
        <Divider className={styles.preferencesDivider} />
        <Flex vertical gap={16} className={styles.preferencesContent}>
          <Flex vertical gap={0.4}>
            <Typography.Text className={styles.preferenceLabel}>
              Location
            </Typography.Text>
            <Flex gap={0.4} wrap>
              {parsePreferredLocations(
                userProfileData?.userCompanyProfile?.preferredLocation
              ).map((location, index) => (
                <Tag
                  key={index}
                  bordered={false}
                  className={styles.preferenceTag}
                >
                  {location}
                </Tag>
              ))}
            </Flex>
          </Flex>

          <Flex vertical gap={0.4}>
            <Typography.Text className={styles.preferenceLabel}>
              Job roles
            </Typography.Text>
            <Flex gap={0.4} wrap>
              {parsePreferredJobRoles(
                userProfileData?.userCompanyProfile?.preferredRole
              ).map((role, index) => (
                <Tag key={index} className={styles.preferenceTag}>
                  {role}
                </Tag>
              ))}
            </Flex>
          </Flex>
          <Flex align="center">
            <Typography.Text className={styles.preferenceLabel}>
              Expected CTC (LPA):
            </Typography.Text>
            <Typography.Text className={styles.preferenceValue}>
              {userProfileData?.userCompanyProfile?.expectedCtc}
            </Typography.Text>
          </Flex>

          <Flex align="center">
            <Typography.Text className={styles.preferenceLabel}>
              Notice period (In days):
            </Typography.Text>
            <Typography.Text className={styles.preferenceValue}>
              {userProfileData?.userCompanyProfile?.noticePeriod}
            </Typography.Text>
          </Flex>

          <Flex align="center">
            {userProfileData?.userCompanyProfile?.buyoutNotice && (
              <Typography.Text className={styles.preferenceLabel}>
                *Buyout available:
              </Typography.Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

ProfileDetails.propTypes = {
  analytics: PropTypes.object,
  className: PropTypes.string,
};

ProfileDetails.defaultProps = {
  className: '',
};

export default ProfileDetails;
