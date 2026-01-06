import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextStep,
  previousStep,
  setCurrentStep,
  setIsEditingPreferences,
} from '../../store/resumeBuilderSlice';
import { Timeline, Button, Typography } from 'antd';
import { getResumeTips } from '../../utils/resumeTips';
import { RESUME_BUILDER_STEPS } from '../../utils/constants';
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
  const isEditingPreferences = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.isEditingPreferences
  );
  const steps = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.steps
  );

  const [tips, setTips] = useState([]);

  useEffect(() => {
    if (resumePersonaData) {
      setTips(getResumeTips(resumePersonaData, program));
    }
  }, [resumePersonaData, program]);

  const handleStartBuilding = () => {
    // Skip Resume Parsing when editing preferences
    if (isEditingPreferences) {
      dispatch(setIsEditingPreferences(false));
      dispatch(
        setCurrentStep(
          steps.findIndex(
            (step) => step.key === RESUME_BUILDER_STEPS.RESUME_STEPS.key
          )
        )
      );
    } else {
      dispatch(nextStep());
    }
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
