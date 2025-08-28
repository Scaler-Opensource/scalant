import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, previousStep } from '../../store/resumeBuilderSlice';
import { Timeline, Button, Typography } from 'antd';
import { getResumeTips } from '../../utils/resumeTips';
const { Paragraph, Text } = Typography;

import styles from './ResumeTips.module.scss';

const ResumeTips = () => {
  const dispatch = useDispatch();
  const resumePersonaData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms.basicQuestions
  );
  const program = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.program
  );

  const [tips, setTips] = useState([]);

  useEffect(() => {
    if (resumePersonaData) {
      setTips(getResumeTips(resumePersonaData, program));
    }
  }, [resumePersonaData, program]);

  const handleStartBuilding = () => {
    dispatch(nextStep());
  };

  return (
    <div>
      <PageHeader
        title="Here are a few Tips based on your profile "
        subtitle="Follow these tips to build a great resume. 
        See the sample on the side for reference."
      />
      <Timeline
        items={tips.map((tip) => ({
          children: (
            <>
              <Paragraph className={styles.tipTitle}>
                <Text strong>
                  {tip.icon} {tip.title}
                </Text>
              </Paragraph>
              <Paragraph type="secondary" className={styles.tipDescription}>
                {tip.description}
              </Paragraph>
            </>
          ),
        }))}
      />

      <Button
        type="primary"
        size="large"
        block
        className={styles.button}
        onClick={handleStartBuilding}
      >
        Start Building
      </Button>
      <Button
        block
        type="text"
        onClick={() => dispatch(previousStep())}
        className={styles.backButton}
      >
        Go Back
      </Button>
    </div>
  );
};

export default ResumeTips;
