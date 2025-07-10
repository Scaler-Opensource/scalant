import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Layout, Typography, Flex, Button, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { setModal } from '../../store/modalsSlice';
import { MODAL_NAMES } from '../../utils/constants';
import ResumeReviewModal from '../../components/ResumeReviewModal/ResumeReviewModal';
import { useGetResumeFeedbackMutation } from '../../services/resumeBuilderApi';
import { setIsLoading } from '../../store/resumeReviewSlice';

const { Header, Content } = Layout;

const { Text } = Typography;

import styles from './ResumeLayout.module.scss';

const LOGO_URL =
  'https://assets.fp.scaler.com/seo/_next/static/media/scaler-light.6def257e.svg';

const ResumeLayout = ({ onBackButtonClick, children, preview }) => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder
  );
  const { isLoading: isReviewLoading } = useSelector(
    (state) => state.scalantResumeBuilder.resumeReview
  );

  const incompleteForms = useSelector(
    (state) => state.scalantResumeBuilder.resumeForms.incompleteForms
  );

  const onReviewResumeClick = useCallback(() => {
    dispatch(setModal({ modalName: MODAL_NAMES.RESUME_REVIEW, isOpen: true }));
  }, [dispatch]);

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
              style={{ width: '100%' }}
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
              <Flex vertical justify="center" align="center">
                {currentStep >= 2 && <Text>Resume Builder</Text>}
                {currentStep === 4 && (
                  <Text>
                    {6 - incompleteForms.length} of 6 sections completed
                  </Text>
                )}
              </Flex>
              {currentStep === 4 && (
                <Tooltip title={reviewTooltipTitle}>
                  <Button
                    type="primary"
                    onClick={onReviewResumeClick}
                    disabled={incompleteForms.length > 0 || isReviewLoading}
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
