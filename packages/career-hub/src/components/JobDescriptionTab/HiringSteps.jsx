import React from 'react';
import { Flex } from 'antd';
import styles from './JobDescriptionTab.module.scss';

const STEPS = [
  {
    title: 'In Progress',
    description: 'Once you apply, our team checks if it’s a right match',
  },
  {
    title: 'Resume Forwarded',
    description: 'We send your resume to the company',
  },
  {
    title: 'Feedback Stage',
    description: 'The company reviews and shares feedback',
  },
  {
    title: 'Interview Process',
    description: 'If selected, your interview rounds begin',
  },
];

const Indicator = () => {
  return (
    <Flex vertical className={styles.indicatorContainer}>
      <div className={styles.indicatorLine} />
      <Flex flex={1} gap={12}>
        {STEPS.map((step, index) => (
          <Flex key={index} flex={1}>
            <div className={styles.indicatorDot} />
          </Flex>
        ))}
        <div className={styles.extraIndicatorDot} />
      </Flex>
    </Flex>
  );
};

const HiringSteps = () => {
  const items = STEPS.map((step) => ({
    title: <span className={styles.stepTitle}>{step.title}</span>,
    description: <span className={styles.stepText}>{step.description}</span>,
  }));

  return (
    <Flex vertical gap={12}>
      <Indicator />
      <Flex className={styles.steps} gap={12}>
        {items.map((item) => (
          <Flex vertical flex={1}>
            {item.title}
            {item.description}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default HiringSteps;
