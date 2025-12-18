import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Select, Space } from 'antd';
import { useApplicationFormContext } from '../../../contexts/ApplicationFormContext';
import { getSkillOptions } from '../../../utils/applicationForm';
import styles from './Field.module.scss';

function Top5Skills({ fieldName, label }) {
  const { updateDefaultField } = useApplicationFormContext();
  const userProfileData = useSelector(
    (state) => state.scalantCareerHub.dashboard.userProfileData
  );
  const experienceBasedSkills = userProfileData?.experienceBasedSkills || [];
  const options = getSkillOptions(experienceBasedSkills);

  const handleChange = (value) => {
    const selectedSkills = experienceBasedSkills.map((skill) => ({
      ...skill,
      isTop5: value.includes(skill.id),
    }));
    updateDefaultField(fieldName, selectedSkills);
  };

  return (
    <Space className={styles.fieldGroup}>
      <Form.Item
        label={label}
        name={fieldName}
        rules={[
          { required: true, message: 'Please select upto 5 primary skills' },
        ]}
        className={styles.field}
      >
        <Select
          onChange={handleChange}
          options={options}
          mode="multiple"
          showSearch={false}
        />
      </Form.Item>
    </Space>
  );
}

export default Top5Skills;
