import React from 'react';
import { Row, Col, Select } from 'antd';
import { Typography } from 'antd';
import ContentWrapper from '../../../layout/ContentWrapper';
import TwoColumnLayout from '../../../layout/TwoColumnLayout';
import styles from './HomePageLayout.module.scss';

const { Text } = Typography;
const { Option } = Select;

const HomePageLayout = ({
  leftContent,
  rightContent,
  currentDesignation = 'Non-tech',
  currentIntent = 'Looking for a job',
  onDesignationChange,
  onIntentChange,
  designationOptions = [],
  intentOptions = [
    { label: 'Looking for a job', value: 'Looking for a job' },
    { label: 'Need time to prepare', value: 'Need time to prepare' },
    { label: 'Not looking for a job', value: 'Not looking for a job' },
    { label: 'Already secured a job', value: 'Already secured a job' },
  ],
  hasSelectedStep = false,
}) => {
  return (
    <div className={styles.homePageLayout}>
      <ContentWrapper
        title="Complete Your Checklist, Unlock Job Access"
        subtitle="Finish this one-time task list today to unlock job opportunities waiting for you."
      >
        <div className={styles.headerRow}>
          <div className={styles.titleSection}>
            {/* Title and subtitle are in ContentWrapper */}
          </div>
          <div className={styles.dropdownsSection}>
            <Row gutter={16}>
              <Col>
                <div className={styles.dropdownGroup}>
                  <Text className={styles.label}>Current Designation:</Text>
                  <Select
                    value={currentDesignation}
                    onChange={onDesignationChange}
                    className={styles.dropdown}
                    placeholder="Select designation"
                  >
                    {designationOptions.length > 0
                      ? designationOptions.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))
                      : [
                          <Option key="fresher" value="Fresher">Fresher</Option>,
                          <Option key="non-tech" value="Non-tech">Non-tech</Option>,
                          <Option key="tech-adjacent" value="Tech adjacent">Tech adjacent</Option>,
                        ]}
                  </Select>
                </div>
              </Col>
              <Col>
                <div className={styles.dropdownGroup}>
                  <Text className={styles.label}>Current Intent:</Text>
                  <Select
                    value={currentIntent}
                    onChange={onIntentChange}
                    className={styles.dropdown}
                    placeholder="Select intent"
                  >
                    {intentOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <TwoColumnLayout
          leftContent={leftContent}
          rightContent={rightContent}
          leftSpan={9}
          rightSpan={15}
          gap={24}
        />
      </ContentWrapper>
    </div>
  );
};

export default HomePageLayout;

