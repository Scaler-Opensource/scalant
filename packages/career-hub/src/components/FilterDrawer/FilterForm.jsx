import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '../../store/filterFormSlice';

import styles from './FilterDrawer.module.scss';

const { Option } = Select;

function FilterForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.scalantCareerHub.filterForm);
  const [form] = Form.useForm();

  const handleFieldChange = (field, value) => {
    dispatch(updateFormField({ field, value }));
  };

  // Dummy options for select fields
  const jobTypes = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
  ];

  const functions = [
    { value: 56529, label: 'Engineering' },
    { value: 56530, label: 'Product' },
    { value: 56531, label: 'Design' },
    { value: 56532, label: 'Marketing' },
  ];

  const seniorityLevels = [
    { value: 202948, label: 'Entry Level' },
    { value: 202949, label: 'Mid Level' },
    { value: 202950, label: 'Senior Level' },
    { value: 202951, label: 'Lead' },
  ];

  const companyCategories = [
    { value: 5, label: 'Technology' },
    { value: 6, label: 'Finance' },
    { value: 7, label: 'Healthcare' },
    { value: 8, label: 'Education' },
  ];

  const locations = [
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Hyderabad', label: 'Hyderabad' },
  ];

  const ctcRanges = [
    { value: 5, label: '5-10 Lakhs' },
    { value: 10, label: '10-15 Lakhs' },
    { value: 15, label: '15-20 Lakhs' },
    { value: 20, label: '20+ Lakhs' },
  ];

  const stipendRanges = [
    { value: 10000, label: '10,000 - 20,000' },
    { value: 20000, label: '20,000 - 30,000' },
    { value: 30000, label: '30,000 - 40,000' },
    { value: 40000, label: '40,000+' },
  ];

  const durationRanges = [
    { value: 3, label: '3 months' },
    { value: 6, label: '6 months' },
    { value: 9, label: '9 months' },
    { value: 12, label: '12 months' },
  ];

  const noticePeriods = [
    { value: 'immediate', label: 'Immediate' },
    { value: '15 days', label: '15 days' },
    { value: '30 days', label: '30 days' },
    { value: '60 days', label: '60 days' },
    { value: '90 days', label: '90 days' },
    { value: 'not filled', label: 'Not Filled' },
  ];

  const datePostedOptions = [
    { value: 1, label: 'Last 24 hours' },
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 90, label: 'Last 90 days' },
  ];

  const mbeSkills = [
    { value: 37223, label: 'React' },
    { value: 37224, label: 'JavaScript' },
    { value: 37225, label: 'Node.js' },
    { value: 37226, label: 'Python' },
  ];

  const skillRatings = [
    { value: 0, label: 'Beginner' },
    { value: 1, label: 'Intermediate' },
    { value: 2, label: 'Advanced' },
    { value: 3, label: 'Expert' },
  ];

  const experienceSkills = [
    { value: 1150, label: 'Frontend Development', type: 'SubTopic' },
    { value: 1151, label: 'Backend Development', type: 'SubTopic' },
    { value: 1152, label: 'Full Stack Development', type: 'SubTopic' },
    { value: 1153, label: 'DevOps', type: 'SubTopic' },
  ];

  return (
    <Form
      layout="vertical"
      className={styles.filterForm}
      form={form}
      initialValues={formData}
    >
      <Form.Item label="Job Types" name="role_type">
        <Select
          placeholder="Select job profile"
          value={formData.role_type}
          onChange={(value) => handleFieldChange('role_type', value)}
        >
          {jobTypes.map((type) => (
            <Option key={type.value} value={type.value}>
              {type.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Company Name" name="company_ids">
        <Input
          placeholder="Search company"
          suffix={<SearchOutlined />}
          value={formData.company_ids?.join(',') || ''}
          onChange={(e) => {
            const value = e.target.value
              ? e.target.value.split(',').map((id) => id.trim())
              : [];
            handleFieldChange('company_ids', value);
          }}
        />
      </Form.Item>

      <Form.Item label="Title" name="job_title">
        <Input
          placeholder="Search job title"
          suffix={<SearchOutlined />}
          value={formData.job_title?.join(',') || ''}
          onChange={(e) => {
            const value = e.target.value
              ? e.target.value.split(',').map((title) => title.trim())
              : [];
            handleFieldChange('job_title', value);
          }}
        />
      </Form.Item>

      <Form.Item label="Function" name="job_category">
        <Select
          mode="multiple"
          placeholder="Select function"
          value={formData.job_category}
          onChange={(value) => handleFieldChange('job_category', value)}
        >
          {functions.map((func) => (
            <Option key={func.value} value={func.value}>
              {func.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Role seniority level" name="seniority_level">
            <Select
              mode="multiple"
              placeholder="Select level"
              value={formData.seniority_level}
              onChange={(value) => handleFieldChange('seniority_level', value)}
            >
              {seniorityLevels.map((level) => (
                <Option key={level.value} value={level.value}>
                  {level.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Company category" name="company_categories">
            <Select
              mode="multiple"
              placeholder="Select category"
              value={formData.company_categories}
              onChange={(value) =>
                handleFieldChange('company_categories', value)
              }
            >
              {companyCategories.map((category) => (
                <Option key={category.value} value={category.value}>
                  {category.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Location" name="location">
        <Select
          mode="multiple"
          placeholder="Select location"
          value={formData.location}
          onChange={(value) => handleFieldChange('location', value)}
        >
          {locations.map((loc) => (
            <Option key={loc.value} value={loc.value}>
              {loc.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Minimum CTC (in Lakhs)?" name="min_ctc">
        <Select
          placeholder="Select range"
          value={formData.min_ctc}
          onChange={(value) => handleFieldChange('min_ctc', value)}
        >
          {ctcRanges.map((range) => (
            <Option key={range.value} value={range.value}>
              {range.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Stipend (INR per month)" name="min_stipend">
            <Select
              placeholder="Select range"
              value={formData.min_stipend}
              onChange={(value) => handleFieldChange('min_stipend', value)}
            >
              {stipendRanges.map((range) => (
                <Option key={range.value} value={range.value}>
                  {range.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Internship duration (in months)"
            name="min_duration"
          >
            <Select
              placeholder="Select range"
              value={formData.min_duration}
              onChange={(value) => handleFieldChange('min_duration', value)}
            >
              {durationRanges.map((range) => (
                <Option key={range.value} value={range.value}>
                  {range.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Notice period requirement" name="notice_period">
            <Select
              placeholder="Choose period"
              value={formData.notice_period}
              onChange={(value) => handleFieldChange('notice_period', value)}
            >
              {noticePeriods.map((period) => (
                <Option key={period.value} value={period.value}>
                  {period.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Job posted date" name="date_posted_on">
            <Select
              placeholder="Pick date"
              value={formData.date_posted_on}
              onChange={(value) => handleFieldChange('date_posted_on', value)}
            >
              {datePostedOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Expert Mock Interview Skills Required">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="mbe_skill_id" noStyle>
              <Select
                placeholder="Select option"
                value={
                  formData.mbe_skill_ids?.[0]?.mbe_skill_id ||
                  formData.mbe_skill_id
                }
                onChange={(value) => {
                  const existing = formData.mbe_skill_ids?.[0] || {};
                  handleFieldChange('mbe_skill_ids', [
                    { ...existing, mbe_skill_id: value },
                  ]);
                }}
              >
                {mbeSkills.map((skill) => (
                  <Option key={skill.value} value={skill.value}>
                    {skill.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="mbe_skill_rating" noStyle>
              <Select
                placeholder="Select rating"
                value={
                  formData.mbe_skill_ids?.[0]?.rating !== undefined
                    ? formData.mbe_skill_ids[0].rating
                    : formData.mbe_skill_rating
                }
                onChange={(value) => {
                  const existing = formData.mbe_skill_ids?.[0] || {};
                  handleFieldChange('mbe_skill_ids', [
                    { ...existing, rating: value },
                  ]);
                }}
              >
                {skillRatings.map((rating) => (
                  <Option key={rating.value} value={rating.value}>
                    {rating.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label="Experienced based skills" name="experience_skill_ids">
        <Select
          mode="multiple"
          placeholder="Select skills"
          value={formData.experience_skill_ids?.map(
            (skill) => skill.experience_skill_id
          )}
          onChange={(value) => {
            const skills = value.map((id) => {
              const existing = formData.experience_skill_ids?.find(
                (s) => s.experience_skill_id === id
              );
              return (
                existing ||
                experienceSkills.find((s) => s.value === id) || {
                  experience_skill_id: id,
                  skill_type: 'SubTopic',
                }
              );
            });
            handleFieldChange('experience_skill_ids', skills);
          }}
        >
          {experienceSkills.map((skill) => (
            <Option key={skill.value} value={skill.value}>
              {skill.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Experience (Years)? *">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="min_experience" noStyle>
              <Input
                placeholder="Minimum"
                type="number"
                value={formData.min_experience}
                onChange={(e) =>
                  handleFieldChange('min_experience', e.target.value)
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="max_experience" noStyle>
              <Input
                placeholder="Maximum"
                type="number"
                value={formData.max_experience}
                onChange={(e) =>
                  handleFieldChange('max_experience', e.target.value)
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default FilterForm;
