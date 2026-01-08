import React, { useEffect } from 'react';
import { Carousel, Flex, message, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_STATUS } from '../../../utils/constants';
import { useApplicationFormContext } from '../../../contexts';
import { useGetFitmentQuery } from '../../../services/fitmentService';
import { useGetResumesEligibilityQuery } from '../../../services/resumeService';
import styles from './ResumeFitmentCheck.module.scss';
import {
  setResumeReviewData,
  setFitmentScore,
} from '../../../store/resumeFitmentSlice';

const EVALUATION_COMPLETION_TIMEOUT = 60000; // 1 minute

const TIPS = [
  {
    title: 'Analysing the Right Resume for you to Apply!',
    description:
      'We’re preparing a fitment score and instant insights to know which resume works best for this application',
  },
  {
    title: 'Preparing quick steps to Strengthen your Resume!',
    description:
      'We’re also figuring out suggestions to improve your resume with final touch ups at lightning speed',
  },
  {
    title: 'Your Analysis will be Ready in just a Few Seconds!',
    description:
      'Fix key gaps we identify and boost your chances of getting noticed by top companies',
  },
];

function ResumeFitmentCheck() {
  const dispatch = useDispatch();
  const { jobProfileId, setStepName } = useApplicationFormContext();
  const { isError, data } = useGetFitmentQuery({
    jobProfileId,
  });
  const { data: resumesEligibilityData } = useGetResumesEligibilityQuery({
    jobProfileId,
  });
  const { fitmentScore: fitmentScoreData } =
    useSelector((state) => state.scalantCareerHub.resumeFitment) || {};

  useEffect(() => {
    const resumeIds = Object.keys(resumesEligibilityData || {});
    const isCompleted =
      resumeIds.length > 0 &&
      Object.keys(fitmentScoreData?.[jobProfileId] || {}).length ===
        resumeIds.length;

    if (isCompleted) {
      setStepName(APPLICATION_STATUS.RESUME_CHOICE_SELECT);
    }
  }, [fitmentScoreData, jobProfileId, resumesEligibilityData, setStepName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStepName(APPLICATION_STATUS.RESUME_CHOICE_SELECT);
    }, EVALUATION_COMPLETION_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [setStepName]);

  useEffect(() => {
    if (isError) {
      message.error('Failed to evaluate job fitment');

      setStepName(APPLICATION_STATUS.RESUME_CHOICE_SELECT);
    }
  }, [isError, setStepName]);

  // TODO: Remove this
  // useEffect(() => {
  //   if (!data?.data) {
  //     return;
  //   }
  //   dispatch(setFitmentScore(data?.data));
  //   dispatch(
  //     setFitmentScore({
  //       job_profile_id: jobProfileId,
  //       user_resume_id: 45507,
  //       score: 60,
  //       remarks:
  //         'The candidate does not meet the minimum experience requirement specified in the job description.',
  //     })
  //   );
  //   dispatch(
  //     setFitmentScore({
  //       job_profile_id: jobProfileId,
  //       user_resume_id: 45504,
  //       score: 50,
  //       remarks:
  //         'The candidate does not meet the minimum experience requirement specified in the job description.',
  //     })
  //   );
  //   dispatch(
  //     setFitmentScore({
  //       job_profile_id: jobProfileId,
  //       user_resume_id: 45461,
  //       score: 40,
  //       remarks:
  //         'The candidate does not meet the minimum experience requirement specified in the job description.',
  //     })
  //   );
  //   dispatch(setResumeReviewData(data?.data));
  // }, [data, dispatch, jobProfileId]);

  return (
    <Flex
      vertical
      gap={8}
      className={styles.container}
      justify="center"
      align="center"
    >
      <div className={styles.iconContainer}>
        <div className={styles.iconScannerLine} />
      </div>
      <div className={styles.carouselContainer}>
        <Carousel
          autoplay
          autoplaySpeed={10000}
          dots={{ className: styles.dots }}
          effect="fade"
          className={styles.carousel}
          adaptiveHeight
        >
          {TIPS.map((tip, index) => (
            <div key={index}>
              <Flex className={styles.tip} vertical gap={8} key={tip.title}>
                <Typography.Text className={styles.title} strong>
                  {tip.title}
                </Typography.Text>
                <Typography.Text className={styles.description}>
                  {tip.description}
                </Typography.Text>
              </Flex>
            </div>
          ))}
        </Carousel>
      </div>
    </Flex>
  );
}

export default ResumeFitmentCheck;
