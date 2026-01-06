import React, { useEffect, useMemo, useState } from 'react';
import {
  GithubOutlined,
  LinkedinOutlined,
  CodeOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import {
  Form,
  Input,
  Flex,
  InputNumber,
  Select,
  Typography,
  Button,
  Space,
  message,
  Spin,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateResumeDetailsMutation } from '../../services/resumeBuilderApi';
import { FORM_KEYS, PROFILE_TYPES } from '../../utils/constants';
import { initializeForm, updateFormData } from '../../store/formStoreSlice';
import { ADDITIONAL_PROFILES } from '../../utils/constants';

import styles from './PersonalInfoAndSocial.module.scss';

const { Text } = Typography;

const FORM_ID = 'personalInfoAndSocialForm';

const initialFormData = {
  personalInfoAndSocial: {
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    gender: '',
    currentCity: '',
    linkedIn: '',
    github: '',
    personalWebsite: '',
  },
};

// URL validation regex pattern
const urlPattern =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const PersonalInfoAndSocial = ({ onComplete, required = false }) => {
  const dispatch = useDispatch();
  const [additionalProfiles, setAdditionalProfiles] = useState([]);

  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );
  const formData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms[FORM_ID]
  );
  const isFormInitialized = useSelector(
    (state) => state.scalantResumeBuilder.formStore.initializedForms[FORM_ID]
  );
  const { incompleteForms, currentIncompleteForm } = useSelector(
    (state) => state.scalantResumeBuilder.resumeForms
  );
  const markComplete =
    incompleteForms.length === 0 ||
    (incompleteForms.length <= 1 &&
      currentIncompleteForm === FORM_KEYS.personal_details);

  const [updateResumeDetails, { isLoading }] = useUpdateResumeDetailsMutation();

  const [form] = Form.useForm();

  // Initialize additional profiles from resume data
  useEffect(() => {
    if (resumeData?.personal_details) {
      const profiles = [];
      ADDITIONAL_PROFILES.forEach((profile) => {
        const profileUrl = resumeData.personal_details[profile.value];
        if (profileUrl) {
          profiles.push({
            type: profile.value,
            url: profileUrl,
          });
        }
      });
      setAdditionalProfiles(profiles);
    }
  }, [resumeData?.personal_details]);

  const initialValues = useMemo(() => {
    if (!resumeData?.personal_details) {
      return initialFormData;
    }

    return {
      personalInfoAndSocial: {
        fullName: resumeData.personal_details.name,
        contactNumber: resumeData.personal_details.phone_number
          ? resumeData.personal_details.phone_number.replace('+91-', '')
          : '',
        emailAddress: resumeData.personal_details.email,
        gender: resumeData.personal_details.gender,
        currentCity: resumeData.personal_details.city,
        linkedIn: resumeData.personal_details.linkedin,
        github: resumeData.personal_details.github,
        personalWebsite: resumeData.personal_details.portfolio,
      },
    };
  }, [resumeData?.personal_details]);

  useEffect(() => {
    if (!isFormInitialized) {
      dispatch(
        initializeForm({
          formId: FORM_ID,
          initialData: initialValues,
        })
      );
    }
  }, [dispatch, isFormInitialized, initialValues]);

  const handleFinish = async () => {
    const values = formData?.personalInfoAndSocial;

    // Update form data with current additional profiles
    const updatedFormData = {
      ...values,
      additionalProfiles,
    };

    dispatch(
      updateFormData({
        formId: FORM_ID,
        data: {
          personalInfoAndSocial: updatedFormData,
        },
      })
    );

    try {
      // Create base payload with main personal details
      const basePayload = {
        form_stage: 'personal_details_v1_form',
        name: values.fullName,
        email: values.emailAddress,
        phone_number: values.contactNumber,
        city: values.currentCity,
        show_user_city: true,
        gender: values.gender,
        linkedin: values.linkedIn,
        github: values.github,
        portfolio: values.personalWebsite,
        isPopulated: true,
        mark_complete: markComplete,
      };

      // Add all additional profiles to payload, always present
      const payload = { ...basePayload };
      ADDITIONAL_PROFILES.forEach((profile) => {
        const found = additionalProfiles.find((p) => p.type === profile.value);
        payload[profile.value] = found ? found.url : '';
      });

      await updateResumeDetails({
        resumeId: resumeData?.resume_details?.id,
        payload,
      }).unwrap();
      message.success('Personal details updated successfully');
    } catch (error) {
      message.error('Failed to update personal details');
      // eslint-disable-next-line no-console, no-undef
      console.error('Error updating personal details:', error);
    }
  };

  const handleSaveAndCompile = () => {
    onComplete?.(FORM_KEYS.personal_details, true);
    handleFinish();
  };

  const handleSaveAndNext = () => {
    onComplete?.(FORM_KEYS.personal_details);
    handleFinish();
  };

  const handleValuesChange = (changedValues, allValues) => {
    // Update the form state in the store
    dispatch(
      updateFormData({
        formId: FORM_ID,
        data: {
          personalInfoAndSocial: {
            ...allValues,
            additionalProfiles,
          },
        },
      })
    );
  };

  const updateProfileAtIndex = (index, updater) => {
    setAdditionalProfiles((prev) =>
      prev.map((profile, idx) => (idx === index ? updater(profile) : profile))
    );
  };

  const handleAddProfile = () => {
    // Get existing profile types
    const existingTypes = additionalProfiles.map((profile) => profile.type);

    // Check if all profile types are already used
    if (existingTypes.length >= ADDITIONAL_PROFILES.length) {
      message.warning('All profile types have already been added');
      return;
    }

    // Find an available profile type
    const availableProfileType = ADDITIONAL_PROFILES.find(
      (profile) => !existingTypes.includes(profile.value)
    );

    // Add new profile
    setAdditionalProfiles((prev) => [
      ...prev,
      {
        type: availableProfileType.value,
        url: '',
      },
    ]);
  };

  const handleRemoveProfile = (indexToRemove) => {
    setAdditionalProfiles((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleProfileChange = (index, field, value) => {
    updateProfileAtIndex(index, (profile) => {
      if (field === 'type' && value === PROFILE_TYPES.SCALER) {
        return {
          ...profile,
          type: value,
          url: resumeData?.personal_details?.scaler || profile.url,
        };
      }

      return {
        ...profile,
        [field]: value,
      };
    });
  };

  const getAvailableProfileTypes = (currentIndex) => {
    const existingTypes = additionalProfiles
      .map((profile, idx) => (idx !== currentIndex ? profile.type : null))
      .filter(Boolean);

    return ADDITIONAL_PROFILES.filter(
      (profile) => !existingTypes.includes(profile.value)
    );
  };

  const renderAdditionalProfiles = () => {
    return additionalProfiles.map((profile, idx) => {
      const availableOptions = getAvailableProfileTypes(idx);

      return (
        <Flex gap={16} key={idx} align="center">
          <Form.Item style={{ width: '45%' }} className={styles.formItem}>
            <Select
              value={profile.type}
              options={availableOptions}
              placeholder="Select Profile Type"
              onChange={(value) => handleProfileChange(idx, 'type', value)}
            />
          </Form.Item>
          <Form.Item
            style={{ width: '45%' }}
            className={styles.formItem}
            rules={[
              {
                required: required,
                pattern: urlPattern,
                message: 'Please enter a valid URL',
              },
            ]}
          >
            <Input
              placeholder="Enter Profile URL"
              value={profile.url}
              disabled={
                profile.type === PROFILE_TYPES.SCALER &&
                Boolean(resumeData?.personal_details?.scaler)
              }
              onChange={(e) => handleProfileChange(idx, 'url', e.target.value)}
            />
          </Form.Item>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => handleRemoveProfile(idx)}
            style={{ marginTop: 4 }}
          />
        </Flex>
      );
    });
  };

  const selectBefore = (
    <Select
      defaultValue="+91"
      options={[
        { label: '+91', value: '+91' },
        { label: '+1', value: '+1' },
      ]}
      disabled
    />
  );

  if (!isFormInitialized) {
    return <Spin />;
  }

  return (
    <Space direction="vertical" size={24}>
      <Form
        form={form}
        layout="vertical"
        size="large"
        initialValues={formData?.personalInfoAndSocial}
        onValuesChange={handleValuesChange}
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: required }]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: required }]}
            className={styles.formItem}
            tooltip="You can update this in the profile section"
          >
            <InputNumber addonBefore={selectBefore} disabled />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="emailAddress"
            rules={[{ required: required }]}
            className={styles.formItem}
            tooltip="You can update this in the profile section"
          >
            <Input disabled />
          </Form.Item>
          <Flex gap={16}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: required }]}
              style={{ flex: 1 }}
              className={styles.formItem}
            >
              <Select
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Other', value: 'other' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Current City"
              name="currentCity"
              style={{ flex: 1 }}
              className={styles.formItem}
            >
              <Input />
            </Form.Item>
          </Flex>
        </Space>

        <Space
          direction="vertical"
          size={16}
          style={{ width: '100%', marginTop: 24 }}
        >
          <Text strong>Social Links</Text>
          <Form.Item
            label="LinkedIn"
            name="linkedIn"
            rules={[
              { required: required },
              {
                pattern: urlPattern,
                message: 'Please enter a valid URL',
              },
            ]}
            className={styles.formItem}
          >
            <Input prefix={<LinkedinOutlined />} />
          </Form.Item>
          <Form.Item
            label="GitHub"
            name="github"
            className={styles.formItem}
            rules={[
              {
                pattern: urlPattern,
                message: 'Please enter a valid URL',
              },
            ]}
          >
            <Input prefix={<GithubOutlined />} />
          </Form.Item>
          <Form.Item
            label="Personal Website"
            name="personalWebsite"
            className={styles.formItem}
            rules={[
              {
                pattern: urlPattern,
                message: 'Please enter a valid URL',
              },
            ]}
          >
            <Input prefix={<CodeOutlined />} />
          </Form.Item>
        </Space>

        <Flex gap={16} vertical style={{ width: '100%', marginTop: 24 }}>
          {renderAdditionalProfiles()}

          <Button type="dashed" onClick={handleAddProfile}>
            Add Profile
          </Button>
        </Flex>

        <Flex gap={16} style={{ marginTop: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSaveAndCompile}
          >
            Save and compile
          </Button>
          <Button
            type="default"
            htmlType="submit"
            block
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSaveAndNext}
          >
            Save and Next
          </Button>
        </Flex>
      </Form>
    </Space>
  );
};

export default PersonalInfoAndSocial;
