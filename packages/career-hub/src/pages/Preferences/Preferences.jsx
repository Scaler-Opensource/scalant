import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Preferences = () => {
  return (
    <div style={{ padding: '24px', minHeight: '400px' }}>
      <Title level={2}>Preferences</Title>
      <Paragraph>
        This is a placeholder for the Preferences page. User preferences and settings will be displayed here.
      </Paragraph>
    </div>
  );
};

export default Preferences;

