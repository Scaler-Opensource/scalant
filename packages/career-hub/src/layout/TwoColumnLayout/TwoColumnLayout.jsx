// Two Column Layout Component
// LLD: Reusable two-column layout for pages that need sidebar/main content split
// Used in: Home/Checklist page (checklist left + details panel right)
// Uses Ant Design Row and Col for responsive grid layout

import React from 'react';
import { Row, Col } from 'antd';
import styles from './TwoColumnLayout.module.scss';

// LLD: TwoColumnLayout Component
// Props:
//   - leftContent: Content for left column (checklist, filters, etc.)
//   - rightContent: Content for right column (details panel, preview, etc.)
//   - leftSpan: Grid span for left column (default: 12)
//   - rightSpan: Grid span for right column (default: 12)
//   - gap: Gap between columns (default: 24)
//   - className: Additional CSS classes
const TwoColumnLayout = ({
  leftContent,
  rightContent,
  leftSpan = 12,
  rightSpan = 12,
  gap = 24,
  className = '',
}) => {
  return (
    <Row gutter={gap} className={`${styles.twoColumnLayout} ${className}`}>
      {/* LLD: Left Column - Main content area (checklist, filters, etc.) */}
      <Col span={leftSpan} className={styles.leftColumn}>
        {leftContent}
      </Col>
      
      {/* LLD: Right Column - Details/Preview panel */}
      <Col span={rightSpan} className={styles.rightColumn}>
        {rightContent}
      </Col>
    </Row>
  );
};

export default TwoColumnLayout;

