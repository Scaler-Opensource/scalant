import React from 'react';
import { Timeline, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { nextStep } from '../../store/resumeBuilderSlice';
import PageHeader from '../PageHeader';

import styles from './Acknowledgement.module.scss';

const Acknowledgement = () => {
  const dispatch = useDispatch();
  const handleContinue = () => {
    dispatch(nextStep());
  };

  return (
    <>
      <PageHeader
        title="Welcome to Careers Hub, Step Into Your Future Career"
        subtitle="Start applying to jobs in three simple steps"
      />
      <Timeline
        className={styles.timeline}
        items={[
          {
            dot: <div className={styles.timelineDot}> 2 </div>,
            children: (
              <div className={styles.timelineItem}>
                <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/151/278/original/Frame_1430102542_%282%29.png?1757927475"></img>
                Tell us what you are aiming for - Job location & CTC
              </div>
            ),
          },
          {
            dot: <div className={styles.timelineDot}> 1 </div>,
            children: (
              <div className={styles.timelineItem}>
                <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/156/248/original/Frame_1430102542_%285%29.png?1759217079"></img>
                Build or Upload a resume that highlights you
              </div>
            ),
          },
          {
            dot: <div className={styles.timelineDot}> 3 </div>,
            children: (
              <div className={styles.timelineItem}>
                <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/151/280/original/Frame_1430102545_%281%29.png?1757927530"></img>
                Discover and apply to curated jobs
              </div>
            ),
          },
        ]}
      />

      <div className={styles.buttonsContainer}>
        <Button
          type="primary"
          block
          className={styles.continueBtn}
          onClick={handleContinue}
        >
          Start building my resume
        </Button>
      </div>
    </>
  );
};

export default Acknowledgement;
