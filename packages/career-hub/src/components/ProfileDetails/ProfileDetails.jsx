import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Avatar, Typography, Flex, Divider, Tag } from 'antd';
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
import styles from './ProfileDetails.module.scss';
function ProfileDetails({ analytics, className, onViewResume, onEditPreferences }) {
  const userProfileData = useSelector(
    (state) => state.scalantCareerHub.dashboard.userProfileData
  );

  const handleViewResume = () => {
    analytics?.click('Profile Details - View Resume', PRODUCT_NAME);
    onViewResume?.();
  };

  const handleEditPreferences = () => {
    analytics?.click('Profile Details - Edit Preferences', PRODUCT_NAME);
    onEditPreferences?.();
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
      </Flex>
      <Flex vertical>
        <Flex justify="space-between">
          <Typography.Title level={5} className={styles.preferencesTitle}>
            Your Preferences
          </Typography.Title>

          <EditTwoTone onClick={handleEditPreferences} />
        </Flex>
        <Divider className={styles.preferencesDivider} />
        <Flex vertical gap={8} className={styles.preferencesContent}>
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
                <Tag
                  key={index}
                  bordered={false}
                  className={styles.preferenceTag}
                >
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
