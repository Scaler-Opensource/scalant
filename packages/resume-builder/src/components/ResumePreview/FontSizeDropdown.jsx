import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

import { setResumeData } from '../../store/resumeBuilderSlice';
import { useUpdateResumePreferencesMutation } from '../../services/resumeBuilderApi';

const DEFAULT_FONT_SIZE = 'medium';

const FontSizeDropdown = ({ onFontSizeChange }) => {
  const dispatch = useDispatch();
  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );
  const selectedFontSize = resumeData?.resume_meta?.font_size;
  const [fontSize, setFontSize] = useState(
    selectedFontSize || DEFAULT_FONT_SIZE
  );

  const [updateResumePreferences] = useUpdateResumePreferencesMutation();

  const handleFontSizeChange = async ({ key }) => {
    setFontSize(key);
    dispatch(
      setResumeData({
        ...resumeData,
        resume_meta: {
          ...resumeData?.resume_meta,
          font_size: key,
        },
      })
    );
    await updateResumePreferences({
      payload: {
        resume_id: resumeData?.resume_details?.id,
        scaler_resume_template_font_choice: key,
      },
    });
    onFontSizeChange?.(key);
  };

  const items = [
    { key: 'small', label: 'Small' },
    { key: 'medium', label: 'Medium' },
    { key: 'large', label: 'Large' },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleFontSizeChange,
        selectedKeys: [fontSize],
      }}
      trigger={['click']}
    >
      <FloatButton
        icon={<FontSizeOutlined />}
        tooltip={`Font Size: ${fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}`}
      />
    </Dropdown>
  );
};

export default FontSizeDropdown;
