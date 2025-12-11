import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '../../store/filterFormSlice';
import { useAsyncFilterOptions } from '../../hooks/useAsyncFilterOptions';
import { useFilterMetaOptions } from '../../hooks/useFilterMetaOptions';
import ExpertMbeRating from './ExpertMbeRating';

import styles from './FilterDrawer.module.scss';

const { Option } = Select;

function FilterForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.scalantCareerHub.filterForm);
  const filterOptionsState = useSelector(
    (state) => state.scalantCareerHub.filterOptions || {}
  );
  const [form] = Form.useForm();

  // Reset form fields when formData changes (e.g., after reset)
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form, formData]);

  // Custom hooks for filter options
  const {
    handleCompanySearch,
    handleTitleSearch,
    handleExperienceSkillSearch,
    loadingCompanies,
    loadingTitles,
    loadingExperienceSkills,
  } = useAsyncFilterOptions();

  const {
    jobTypes,
    functions,
    seniorityLevels,
    companyCategories,
    locations,
    mbeSkills,
    ctcRanges,
    stipendRanges,
    durationRanges,
    noticePeriods,
    datePostedOptions,
    skillRatings,
  } = useFilterMetaOptions();

  const handleFieldChange = (field, value) => {
    dispatch(updateFormField({ field, value }));
  };

  // Get job type value for conditional rendering
  const jobTypeValue = formData.role_type;
  const isFullTime = jobTypeValue === 'full_time';
  const isInternship = jobTypeValue === 'internship';

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
            <Option key={type.key} value={type.key}>
              {type.value}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Company Name" name="company_ids">
        <Select
          mode="multiple"
          showSearch
          placeholder="Search company"
          filterOption={false}
          onSearch={handleCompanySearch}
          loading={loadingCompanies}
          value={formData.company_ids}
          onChange={(value) => handleFieldChange('company_ids', value)}
          notFoundContent={
            loadingCompanies
              ? 'Loading...'
              : 'Type at least 3 characters to search'
          }
        >
          {filterOptionsState.companyOptions?.map((company) => (
            <Option key={company.key} value={company.key}>
              {company.value}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Title" name="job_title">
        <Select
          mode="multiple"
          showSearch
          placeholder="Search job title"
          filterOption={false}
          onSearch={handleTitleSearch}
          loading={loadingTitles}
          value={formData.job_title}
          onChange={(value) => handleFieldChange('job_title', value)}
          notFoundContent={
            loadingTitles
              ? 'Loading...'
              : 'Type at least 3 characters to search'
          }
        >
          {filterOptionsState.titleOptions?.map((title) => (
            <Option key={title.key} value={title.value}>
              {title.value}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Function" name="job_category">
        <Select
          mode="multiple"
          placeholder="Select function"
          value={formData.job_category}
          onChange={(value) => handleFieldChange('job_category', value)}
        >
          {functions.map((func) => (
            <Option key={func.key} value={func.value}>
              {func.value}
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
                <Option key={level.key} value={level.value}>
                  {level.value}
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
                <Option key={category.key} value={category.value}>
                  {category.value}
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
            <Option key={loc.key} value={loc.value}>
              {loc.value}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {!isInternship && (
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
      )}

      {!isFullTime && (
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
      )}

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
        <ExpertMbeRating
          fieldName="mbe_skill_ids"
          subjectOptions={mbeSkills}
          ratingOptions={skillRatings}
        />
      </Form.Item>

      <Form.Item label="Experienced based skills" name="experience_skill_ids">
        <Select
          mode="multiple"
          showSearch
          placeholder="Search skills"
          filterOption={false}
          onSearch={handleExperienceSkillSearch}
          loading={loadingExperienceSkills}
          value={formData.experience_skill_ids?.map(
            (skill) => skill.experience_skill_id || skill
          )}
          onChange={(value) => {
            const skills = value.map((id) => {
              const existing = formData.experience_skill_ids?.find(
                (s) => (s.experience_skill_id || s) === id
              );
              const optionSkill =
                filterOptionsState.experienceSkillOptions?.find(
                  (s) => s.key === id
                );
              return (
                existing ||
                (optionSkill
                  ? {
                      experience_skill_id: optionSkill.key,
                      skill_type: optionSkill.type || 'SubTopic',
                    }
                  : {
                      experience_skill_id: id,
                      skill_type: 'SubTopic',
                    })
              );
            });
            handleFieldChange('experience_skill_ids', skills);
          }}
          notFoundContent={
            loadingExperienceSkills
              ? 'Loading...'
              : 'Type at least 2 characters to search'
          }
        >
          {filterOptionsState.experienceSkillOptions?.map((skill) => (
            <Option key={skill.key} value={skill.key}>
              {skill.value}
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
