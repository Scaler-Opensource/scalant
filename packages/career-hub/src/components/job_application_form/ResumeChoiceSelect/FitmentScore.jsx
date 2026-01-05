import React from 'react';
import { Flex, Progress, Typography } from 'antd';
import styles from './ResumeChoiceSelect.module.scss';

function FitmentScore({ score }) {
  let strokeColor = {
    '0%': '#FC2119',
    '60%': '#FF9C40',
  };
  let trailColor = '#FFD5C0';

  if (Number(score) >= 60) {
    strokeColor = {
      '0%': '#FC8019',
      '80%': '#FFD284',
    };

    trailColor = '#FC910033';
  }

  if (Number(score) >= 80) {
    strokeColor = {
      '0%': '#03522D',
      '100%': '#22C477',
    };

    trailColor = '#1A845233';
  }

  return (
    <Flex vertical gap={4} className={styles.fitmentScore}>
      <Typography.Text className={styles.fitmentScoreTitle}>
        Your Resume Fit Score:
      </Typography.Text>
      <Progress
        size={['default', 12]}
        percent={score}
        className={styles.fitmentScoreProgress}
        strokeColor={strokeColor}
        trailColor={trailColor}
      />
    </Flex>
  );
}

export default FitmentScore;
