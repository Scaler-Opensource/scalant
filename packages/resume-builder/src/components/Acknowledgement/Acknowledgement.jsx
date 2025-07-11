import React, { useState } from 'react';
import { Checkbox, Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { nextStep } from '../../store/resumeBuilderSlice';
import PageHeader from '../PageHeader';
import styles from './Acknowledgement.module.scss';

const { Paragraph } = Typography;

const Acknowledgement = () => {
  const dispatch = useDispatch();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const handleContinue = () => {
    if (checked1 && checked2 && checked3) {
      dispatch(nextStep());
    }
  };

  return (
    <>
      <PageHeader
        title="Scaler Resume Builder"
        subtitle="Build a Resume with ATS Compliance"
      />
      <Paragraph className={styles.description}>
        Please acknowledge the following pointers basis on which your profile
        will be shortlisted for Job Opportunities.
      </Paragraph>

      <Checkbox
        className={styles.checkbox}
        checked={checked1}
        onChange={(e) => setChecked1(e.target.checked)}
      >
        Your Job Preferences like CTC, Location, Notice Period are key points
        based on which Scaler will showcase relevant job opportunities
      </Checkbox>

      <Checkbox
        className={styles.checkbox}
        checked={checked2}
        onChange={(e) => setChecked2(e.target.checked)}
      >
        Your relevant tech work experience and technical skills entered in your
        Scaler Resume Builder will be used for matching you with relevant job
        opportunities
      </Checkbox>

      <Checkbox
        className={styles.checkbox}
        checked={checked3}
        onChange={(e) => setChecked3(e.target.checked)}
      >
        Adding incorrect information on your resume can lower your chances of
        getting shortlisted as recruiters will do a thorough validation check
      </Checkbox>

      <div className={styles.buttonsContainer}>
        <Button
          type="primary"
          block
          className={styles.continueBtn}
          disabled={!(checked1 && checked2 && checked3)}
          onClick={handleContinue}
        >
          I Understand, Continue
        </Button>
      </div>
    </>
  );
};

export default Acknowledgement;
