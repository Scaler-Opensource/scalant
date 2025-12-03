import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const MyResume = () => {
  return (
    <div style={{ padding: '24px', minHeight: '400px' }}>
      <Title level={2}>My Resume</Title>
      <Paragraph>
        This is a placeholder for the My Resume page. Resume management features will be displayed here.
      </Paragraph>
    </div>
  );
};

export default MyResume;

