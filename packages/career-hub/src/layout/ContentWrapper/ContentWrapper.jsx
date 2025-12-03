// Content Wrapper Component
// LLD: Consistent content wrapper with max-width, padding, and responsive behavior
// Used throughout pages for consistent spacing and layout

import React from 'react';
import { Typography } from 'antd';
import styles from './ContentWrapper.module.scss';

const { Title, Text } = Typography;

// LLD: ContentWrapper Component
// Props:
//   - children: Content to wrap
//   - title: Optional page title
//   - subtitle: Optional page subtitle/description
//   - maxWidth: Max width constraint (default: 1400px)
//   - className: Additional CSS classes
const ContentWrapper = ({
  children,
  title,
  subtitle,
  maxWidth = '1400px',
  className = '',
}) => {
  return (
    <div
      className={`${styles.contentWrapper} ${className}`}
      style={{ maxWidth }}
    >
      {/* LLD: Optional title and subtitle section */}
      {(title || subtitle) && (
        <div className={styles.headerSection}>
          {title && <Title level={2} className={styles.title}>{title}</Title>}
          {subtitle && (
            <Text type="secondary" className={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </div>
      )}
      
      {/* LLD: Main content area */}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default ContentWrapper;

