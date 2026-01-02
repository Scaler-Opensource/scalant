import React, { useMemo, useState } from 'react';
import { Select } from 'antd';

const MAX_OPTIONS = 50;

const SearchableSkillPicker = ({
  skillsData = [],
  selectedSkillIds = [],
  onSkillSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const availableSkills = useMemo(() => {
    const selectedSet = new Set(selectedSkillIds);
    return skillsData.filter((skill) => !selectedSet.has(skill.subtopic_id));
  }, [skillsData, selectedSkillIds]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) {
      return availableSkills.slice(0, MAX_OPTIONS);
    }
    const query = searchQuery.toLowerCase();
    return availableSkills
      .filter((skill) => skill.subtopic.toLowerCase().includes(query))
      .slice(0, MAX_OPTIONS);
  }, [availableSkills, searchQuery]);

  const handleSelect = (value) => {
    const skill = skillsData.find((s) => s.subtopic_id === value);
    if (skill) {
      onSkillSelect?.(skill);
      setSearchQuery('');
    }
  };

  return (
    <Select
      showSearch
      placeholder="Search and select a skill..."
      value={undefined}
      onSearch={setSearchQuery}
      onSelect={handleSelect}
      filterOption={false}
      options={filteredOptions.map((skill) => ({
        value: skill.subtopic_id,
        label: skill.subtopic,
      }))}
      style={{ width: '100%' }}
      allowClear
    />
  );
};

export default SearchableSkillPicker;
