import React, { useEffect } from 'react';
import { Flex, message, Typography } from 'antd';
import { FileTextTwoTone } from '@ant-design/icons';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
import { APPLICATION_STATUS } from '../../../utils/constants';
// import { setFitmentScore } from '../../../store/resumeFitmentSlice';
import { useApplicationFormContext } from '../../../contexts';
import { useGetFitmentQuery } from '../../../services/fitmentService';
import { useGetResumesEligibilityQuery } from '../../../services/resumeService';
import styles from './ResumeFitmentCheck.module.scss';

const EVALUATION_COMPLETION_TIMEOUT = 30000; // 30 seconds

function ResumeFitmentCheck() {
  // const dispatch = useDispatch();
  const { jobProfileId, setStepName } = useApplicationFormContext();
  const {
    // data,
    isError,
  } = useGetFitmentQuery({
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
  // }, [data, dispatch, jobProfileId]);

  return (
    <Flex
      vertical
      gap={8}
      className={styles.container}
      justify="center"
      align="center"
    >
      <FileTextTwoTone size={72} className={styles.icon} />
      <Typography.Text className={styles.title} strong>
        Analysing the Right Resume for you to Apply!
      </Typography.Text>
      <Typography.Text className={styles.description}>
        Receive instant insights and a fitment score to know which resume works
        best. Fix key gaps and boost your chances of getting noticed by top
        companies
      </Typography.Text>
    </Flex>
  );
}

export default ResumeFitmentCheck;
