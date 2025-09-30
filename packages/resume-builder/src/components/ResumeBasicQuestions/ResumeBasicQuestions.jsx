import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { nextStep, previousStep } from '../../store/resumeBuilderSlice';
import {
  Typography,
  Flex,
  Form,
  InputNumber,
  Select,
  Button,
  message,
} from 'antd';
import PageHeader from '../PageHeader';
import { updateFormData } from '../../store/formStoreSlice';
import styles from './ResumeBasicQuestions.module.scss';
import {
  PROGRAM_JOB_ROLES,
  DEFAULT_TEMPLATE_CONFIG,
} from '../../utils/constants';
import { useUpdateResumeDetailsMutation } from '../../services/resumeBuilderApi';
import { useBasicQuestionsForm } from '../../hooks/useBasicQuestionsForm';
import { PROGRAM_TYPES } from '../../utils/constants';

const { Text } = Typography;

const getJobRoles = (program) => {
  return PROGRAM_JOB_ROLES[program] || [];
};

const ResumeBasicQuestions = ({ isLastStep = false }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [currentJobRole, setCurrentJobRole] = useState(null);

  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );
  const program = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.program
  );

  const basicQuestionsData = resumeData?.personal_details;
  const jobRoles = getJobRoles(program);
  const isNonTechOrFresher =
    currentJobRole === 'Fresher' || currentJobRole === 'Non-Tech';

  const { initialValues, FORM_ID } = useBasicQuestionsForm(
    basicQuestionsData,
    jobRoles
  );
  const formData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms[FORM_ID]
  );

  const [updateResumeDetails, { isLoading }] = useUpdateResumeDetailsMutation();

  useEffect(() => {
    // Initialize form with Redux state
    form.setFieldsValue(formData);
    // Initialize current job role from form data
    if (formData?.currentJobRole) {
      setCurrentJobRole(formData.currentJobRole);
    }
  }, [form, formData]);

  const handleValuesChange = (changedValues, allValues) => {
    // Track current job role for disabling tech experience fields
    if (changedValues.currentJobRole !== undefined) {
      setCurrentJobRole(changedValues.currentJobRole);

      // Clear tech experience fields when switching to Fresher or Non-Tech
      if (
        changedValues.currentJobRole === 'Fresher' ||
        changedValues.currentJobRole === 'Non-Tech'
      ) {
        form.setFieldsValue({
          totalWorkExperienceInTech: {
            yearsExperienceInTech: 0,
            monthsExperienceInTech: 0,
          },
        });
      }
    }

    dispatch(
      updateFormData({
        formId: FORM_ID,
        data: allValues,
      })
    );
  };

  const handleFinish = async (values) => {
    const totalExperience =
      values?.totalWorkExperience?.yearsExperience * 12 +
      values?.totalWorkExperience?.monthsExperience;

    const techExperience = isNonTechOrFresher
      ? 0
      : values?.totalWorkExperienceInTech?.yearsExperienceInTech * 12 +
        values?.totalWorkExperienceInTech?.monthsExperienceInTech;

    if (techExperience > totalExperience) {
      message.error('Tech experience cannot exceed total work experience');
      return;
    }

    const payload = {
      form_stage: 'resume_preference_details_form',
      total_experience: totalExperience,
      experience: techExperience,
      job_title: values?.currentJobRole,
      scaler_resume_template_structure: DEFAULT_TEMPLATE_CONFIG,
    };

    try {
      await updateResumeDetails({
        resumeId: resumeData?.resume_details?.id,
        payload,
      }).unwrap();
      message.success('Preference details updated successfully');
    } catch (error) {
      message.error(`Failed to update preference details: ${error.message}`);
    }

    batch(() => {
      const formData = {
        totalExperience,
        techExperience,
        currentJobRole: values?.currentJobRole,
      };

      dispatch(
        updateFormData({
          formId: FORM_ID,
          data: formData,
        })
      );
      dispatch(nextStep());
    });
  };

  return (
    <Flex vertical gap={32} align="flex-start">
      <Flex vertical>
        <PageHeader
          title="Your success story begins with a resume"
          subtitle={`Your profile helps us personalize your resume`}
        />
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
          initialValues={initialValues}
        >
          <Flex gap={16} vertical>
            <Form.Item
              label="Current Job Profile"
              name="currentJobRole"
              rules={[{ required: true }]}
              className={styles.formItem}
            >
              <Select options={jobRoles} />
            </Form.Item>

            <Form.Item
              label="Total Work Experience"
              className={styles.formItem}
              required
            >
              <Flex gap={16} align="center">
                <Flex gap={4} vertical>
                  <Form.Item
                    name={['totalWorkExperience', 'yearsExperience']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter years of total work experience',
                      },
                    ]}
                    noStyle
                    className={styles.formItem}
                  >
                    <InputNumber placeholder="00" />
                  </Form.Item>
                  <Text>Years</Text>
                </Flex>
                <Flex gap={4} vertical>
                  <Form.Item
                    name={['totalWorkExperience', 'monthsExperience']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter months of total work experience',
                      },
                    ]}
                    noStyle
                    className={styles.formItem}
                  >
                    <InputNumber placeholder="00" />
                  </Form.Item>
                  <Text>Months</Text>
                </Flex>
              </Flex>
            </Form.Item>

            <Form.Item
              label={`Total Experience as ${
                program === PROGRAM_TYPES.DSML
                  ? 'Data Analyst / Scientist'
                  : 'Software Developer'
              }`}
              className={styles.formItem}
              required={!isNonTechOrFresher}
              tooltip="Total work experience in tech only includes relevant experience in SDE or Data Science/Analytics roles"
            >
              <Flex gap={16} align="center">
                <Flex gap={4} vertical>
                  <Form.Item
                    name={[
                      'totalWorkExperienceInTech',
                      'yearsExperienceInTech',
                    ]}
                    rules={[
                      {
                        required: !isNonTechOrFresher,
                        message: 'Please enter years of tech work experience',
                      },
                    ]}
                    noStyle
                    className={styles.formItem}
                  >
                    <InputNumber
                      placeholder="00"
                      disabled={isNonTechOrFresher}
                    />
                  </Form.Item>
                  <Text>Years</Text>
                </Flex>
                <Flex gap={4} vertical>
                  <Form.Item
                    name={[
                      'totalWorkExperienceInTech',
                      'monthsExperienceInTech',
                    ]}
                    rules={[
                      {
                        required: !isNonTechOrFresher,
                        message: 'Please enter months of tech work experience',
                      },
                    ]}
                    noStyle
                    className={styles.formItem}
                  >
                    <InputNumber
                      placeholder="00"
                      disabled={isNonTechOrFresher}
                    />
                  </Form.Item>
                  <Text>Months</Text>
                </Flex>
              </Flex>
            </Form.Item>
          </Flex>

          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            className={styles.button}
            loading={isLoading}
          >
            {isLastStep ? 'Submit' : 'Save & Continue'}
          </Button>
          <Button
            block
            type="text"
            onClick={() => dispatch(previousStep())}
            className={styles.backButton}
          >
            Go Back
          </Button>
        </Form>
      </Flex>
    </Flex>
  );
};

export default ResumeBasicQuestions;
