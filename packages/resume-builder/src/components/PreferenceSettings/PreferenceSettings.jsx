import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep } from '../../store/resumeBuilderSlice';
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Flex,
  Checkbox,
  message,
} from 'antd';
import { PREFERRED_JOB_ROLES } from './constants';
import styles from './PreferenceSettings.module.scss';
import { initializeForm, updateFormData } from '../../store/formStoreSlice';
import { useUpdateResumeDetailsMutation } from '../../services/resumeBuilderApi';

const FORM_ID = 'preferenceSettings';
const ANYWHERE_IN_INDIA = 'anywhere_in_india';

const initialFormData = {
  preferredLocations: [],
  preferredRoles: [],
  ctc: '',
  notice: '',
  negotiable: 'no',
  internship: true,
  acknowledge: true,
  anywhereInIndia: false,
};

const PreferenceSettings = ({ isLastStep = false }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );
  const formData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms[FORM_ID]
  );
  const isFormInitialized = useSelector(
    (state) => state.scalantResumeBuilder.formStore.initializedForms[FORM_ID]
  );
  const preferenceData = resumeData?.user_company_profile;
  const preferredJobLocationValues = useSelector(
    (state) => state.scalantResumeBuilder.metaData.meta.job_locations
  );
  const [updateResumeDetails, { isLoading }] = useUpdateResumeDetailsMutation();
  const [
    uniquePreferredJobLocationValues,
    setUniquePreferredJobLocationValues,
  ] = useState(preferredJobLocationValues);

  const { role_types } = useSelector(
    (state) => state.scalantResumeBuilder.metaData.meta
  );

  const initialValues = useMemo(
    () =>
      preferenceData
        ? (() => {
            const preferredLocationStr =
              preferenceData?.preferred_location || '';
            const locationParts = preferredLocationStr
              ? preferredLocationStr.split('/')
              : [];
            const hasAnywhere = locationParts.includes(ANYWHERE_IN_INDIA);
            return {
              preferredLocations: hasAnywhere ? [] : locationParts,
              preferredRoles: preferenceData?.preferred_role?.split('/'),
              ctc: preferenceData?.expected_ctc,
              notice: preferenceData?.notice_period,
              negotiable: preferenceData?.buyout_notice ? 'yes' : 'no',
              internship: true,
              acknowledge: true,
              anywhereInIndia: hasAnywhere,
            };
          })()
        : initialFormData,
    [preferenceData]
  );

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

  useEffect(() => {
    // Initialize form with Redux state
    form.setFieldsValue(formData);
  }, [form, formData]);

  useEffect(() => {
    setUniquePreferredJobLocationValues(
      preferredJobLocationValues.filter(
        (value, index, self) =>
          self.findIndex((t) => t.value === value.value) === index
      )
    );
  }, [preferredJobLocationValues]);

  const createPreferencePayload = () => {
    let preferredRolesTypes = role_types;
    if (!form.getFieldsValue().internship) {
      preferredRolesTypes = role_types.filter(
        (role) => role.label !== 'internship'
      );
    }
    // If preferred locations is an array, convert it to a string separated by /
    // If preferred roles is an array, convert it to a string separated by /
    const { preferredLocations: preferredLocationsField, anywhereInIndia } =
      form.getFieldsValue();
    let preferredLocations = preferredLocationsField;
    if (anywhereInIndia) {
      preferredLocations = ANYWHERE_IN_INDIA;
    }
    let preferredRoles = form.getFieldsValue().preferredRoles;
    if (Array.isArray(preferredLocations)) {
      preferredLocations = preferredLocations.join('/');
    }
    if (Array.isArray(preferredRoles)) {
      preferredRoles = preferredRoles.join('/');
    }

    return {
      form_stage: 'preferences_details_v1_form',
      preferred_location: preferredLocations,
      preferred_role: preferredRoles,
      expected_ctc: form.getFieldsValue().ctc,
      ctc_currency: 'INR',
      notice_period: form.getFieldsValue().notice,
      buyout_notice: form.getFieldsValue().negotiable === 'yes',
      rpo_consent: 'true',
      isPopulated: true,
      preferred_role_types: preferredRolesTypes,
      relevancy_alert: form.getFieldsValue().acknowledge,
    };
  };

  const handleValuesChange = (changedValues, allValues) => {
    dispatch(
      updateFormData({
        formId: FORM_ID,
        data: allValues,
      })
    );
  };

  const handleFinish = async () => {
    const payload = createPreferencePayload();

    try {
      await updateResumeDetails({
        resumeId: resumeData?.resume_details?.id,
        payload,
      }).unwrap();
      message.success('Preference details updated successfully');
    } catch (error) {
      message.error(`Failed to update preference details: ${error.message}`);
    }
    dispatch(nextStep());
  };

  return (
    <div>
      <PageHeader
        title="Set Your Job Preferences"
        subtitle="Your preferences help us bring relevant job opportunities 
        for you in the future"
      />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
        initialValues={initialValues}
      >
        <Form.Item
          noStyle
          shouldUpdate={(prev, cur) =>
            prev.anywhereInIndia !== cur.anywhereInIndia
          }
        >
          {({ getFieldValue }) => (
            <>
              <Form.Item
                label="Preferred job locations?"
                name="preferredLocations"
                rules={[
                  {
                    required: !getFieldValue('anywhereInIndia'),
                    message: 'Please select preferred location!',
                  },
                ]}
                tooltip="Flexibility in your job locations will enable you to be eligible for more opportunities."
              >
                <Select
                  mode="multiple"
                  allowClear
                  disabled={getFieldValue('anywhereInIndia')}
                  options={uniquePreferredJobLocationValues}
                />
              </Form.Item>
              <Form.Item name="anywhereInIndia" valuePropName="checked">
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      form.setFieldsValue({ preferredLocations: [] });
                    }
                  }}
                >
                  I am open to jobs anywhere in India
                </Checkbox>
              </Form.Item>
            </>
          )}
        </Form.Item>

        <Form.Item
          label="Preferred job roles?"
          name="preferredRoles"
          rules={[{ required: true, message: 'Please select job roles!' }]}
        >
          <Select mode="multiple" allowClear options={PREFERRED_JOB_ROLES} />
        </Form.Item>

        <Form.Item
          label="Current CTC (LPA)"
          name="ctc"
          rules={[
            { required: true, message: 'Please enter your current CTC!' },
          ]}
        >
          <Input placeholder="e.g., 3" />
        </Form.Item>

        <Flex gap={16}>
          <Form.Item
            label="Notice Period (in Days)"
            name="notice"
            rules={[{ required: true, message: 'Please enter notice period!' }]}
          >
            <Input placeholder="e.g., 3" />
          </Form.Item>
          {/* // If notice period is 0 then disable negotiable field */}
          <Form.Item
            label="Negotiable / Can Buyout ?"
            name="negotiable"
            rules={[{ required: true, message: 'Please select an option!' }]}
          >
            <Radio.Group
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
              disabled={formData?.notice === '0'}
            />
          </Form.Item>
        </Flex>

        <Form.Item
          name="internship"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please select an option!' }]}
        >
          <Checkbox>I am also open to Internships</Checkbox>
        </Form.Item>

        <Form.Item name="acknowledge" valuePropName="checked">
          <Checkbox>
            Notify me on email and Whatsapp if any relevant job is added to
            Careers Hub dashboard as per my given preference
          </Checkbox>
        </Form.Item>

        <div className={styles.buttonContainer}>
          <Button
            className={styles.submitBtn}
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
          >
            {isLastStep ? 'Submit' : 'Save and Continue'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PreferenceSettings;
