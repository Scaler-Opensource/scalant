import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Layout, Typography, Flex, Button, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { setModal } from '../../store/modalsSlice';
import {
  MODAL_NAMES,
  RESUME_BUILDER_STEPS,
  FORM_KEYS,
} from '../../utils/constants';
import ResumeReviewModal from '../../components/ResumeReviewModal/ResumeReviewModal';

const { Header, Content } = Layout;

const { Text } = Typography;

import styles from './ResumeLayout.module.scss';

const LOGO_URL =
  'https://assets.fp.scaler.com/seo/_next/static/media/scaler-light.6def257e.svg';

const ResumeLayout = ({
  onBackButtonClick,
  children,
  preview,
  enableResumeReview,
  onReviewResumeClick,
}) => {
  const dispatch = useDispatch();
  const { currentStep, steps } = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder
  );
  const { isLoading: isReviewLoading } = useSelector(
    (state) => state.scalantResumeBuilder.resumeReview
  );

  const incompleteForms = useSelector(
    (state) => state.scalantResumeBuilder.resumeForms.incompleteForms
  );

  const handleReviewResumeClick = useCallback(() => {
    dispatch(setModal({ modalName: MODAL_NAMES.RESUME_REVIEW, isOpen: true }));
    onReviewResumeClick?.();
  }, [dispatch, onReviewResumeClick]);

  const currentStepData = steps?.[currentStep] || {};
  const isResumeSteps =
    currentStepData?.key === RESUME_BUILDER_STEPS.RESUME_STEPS.key;
  const totalSections = Object.keys(FORM_KEYS).length;

  const reviewTooltipTitle = useMemo(() => {
    if (incompleteForms.length > 0) {
      return 'Complete all sections in resume to start review and get feedback';
    } else if (isReviewLoading) {
      return 'Reviewing your resume...';
    }
    return '';
  }, [incompleteForms, isReviewLoading]);

  return (
    <Row>
      <Col span={12} className={styles.left}>
        <Layout className={styles.layout}>
          <Header className={styles.header}>
            <Flex
              justify="space-between"
              align="center"
              style={{ width: '100%', position: 'relative' }}
            >
              <div>
                {onBackButtonClick && (
                  <CloseOutlined
                    className={styles.backButton}
                    onClick={onBackButtonClick}
                  />
                )}
                <img className={styles.logo} src={LOGO_URL} alt="logo" />
              </div>

              <Flex
                vertical
                justify="center"
                align="center"
                style={{
                  width: '100%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {isResumeSteps && <Text>Resume Builder</Text>}
                {isResumeSteps && (
                  <Text>
                    {`${totalSections - incompleteForms.length} of ${totalSections} sections completed`}
                  </Text>
                )}
              </Flex>

              {isResumeSteps && enableResumeReview && (
                <Tooltip title={reviewTooltipTitle}>
                  <Button
                    type="primary"
                    onClick={handleReviewResumeClick}
                    disabled={isReviewLoading}
                  >
                    Review Resume
                  </Button>
                </Tooltip>
              )}
            </Flex>
          </Header>
          <Content className={styles.content}>
            {' '}
            <div className={styles.contentInner}>{children}</div>
          </Content>
        </Layout>
      </Col>
      <Col className={styles.right} span={12}>
        {preview}
      </Col>
      <ResumeReviewModal />
    </Row>
  );
};

export default ResumeLayout;
