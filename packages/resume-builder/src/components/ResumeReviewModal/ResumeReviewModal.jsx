import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Flex, Typography, Button, message } from 'antd';
import { StarOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './ResumeReviewModal.module.scss';
import resumeImg from '../../assets/sample_resume_mockup.svg';
import { setModal } from '../../store/modalsSlice';
import { MODAL_NAMES } from '../../utils/constants';
import { useGetResumeFeedbackMutation } from '../../services/resumeBuilderApi';
import { setIsLoading } from '../../store/resumeReviewSlice';

const { Title, Text } = Typography;

const ResumeReviewModal = () => {
  const [modalState, setModalState] = useState('INITIATE_REVIEW');
  const dispatch = useDispatch();
  const [getResumeFeedback] = useGetResumeFeedbackMutation();
  const isModalOpen = useSelector(
    (state) => state.scalantResumeBuilder.modals[MODAL_NAMES.RESUME_REVIEW]
  );
  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );

  const handleCloseModal = useCallback(() => {
    dispatch(setModal({ modalName: MODAL_NAMES.RESUME_REVIEW, isOpen: false }));
  }, [dispatch]);

  const handleReviewResume = useCallback(async () => {
    try {
      await getResumeFeedback({
        resumeId: resumeData?.resume_details?.id,
      }).unwrap();
      message.success('Reviewing your resume...');
      handleCloseModal();
      dispatch(setIsLoading(true));
    } catch {
      message.error('Error getting resume feedback');
    }
  }, [dispatch, getResumeFeedback, resumeData, handleCloseModal]);

  const handleDownloadResume = useCallback(() => {
    // Implement download logic here
    console.log('Downloading resume...');
  }, []);

  const MODAL_STATES = {
    INITIATE_REVIEW: {
      title:
        'Great Work! Now review your resume to get ready for job applications',
      description:
        'Use our Resume Review Tool to double-check your resume, fine tune details and boost your chances of landing that dream job!',
      isButtonDisabled: false,
      buttonText: 'Review Resume',
      buttonIcon: <StarOutlined />,
      onButtonClick: handleReviewResume,
    },
    RESUME_PASSED: {
      title: 'Congratulations! Your resume looks good',
      description:
        'Click on the button below to download industry ready resume and apply with confidence',
      isButtonDisabled: false,
      buttonText: 'Download Resume',
      buttonIcon: <DownloadOutlined />,
      onButtonClick: handleDownloadResume,
    },
  };

  const currentState = MODAL_STATES[modalState];

  return (
    <Modal
      open={isModalOpen}
      centered
      footer={null}
      closable={false}
      width={800}
      classNames={{
        content: styles.modal,
        body: styles.modalBody,
      }}
    >
      <Flex
        vertical
        className={styles.leftSection}
        justify="space-between"
        align="flex-start"
      >
        <Flex vertical gap={16}>
          <Title level={4} className={styles.title}>
            {currentState.title}
          </Title>
          <Text className={styles.description}>{currentState.description}</Text>
        </Flex>
        <Flex gap={16}>
          <Button
            type="primary"
            icon={currentState.buttonIcon}
            className={styles.reviewButton}
            disabled={currentState.isButtonDisabled}
            onClick={currentState.onButtonClick}
          >
            {currentState.buttonText}
          </Button>
          <Button
            type="text"
            className={styles.doItLaterButton}
            disabled={currentState.isButtonDisabled}
            onClick={handleCloseModal}
          >
            Do it Later
          </Button>
        </Flex>
      </Flex>
      <div className={styles.rightSection}>
        <img
          src={resumeImg}
          alt="Resume Preview"
          className={styles.resumeImg}
        />
      </div>
    </Modal>
  );
};

export default ResumeReviewModal;
