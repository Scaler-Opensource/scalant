import React, { useState } from 'react';
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Typography,
} from 'antd';
import { CheckCircleFilled, WarningFilled } from '@ant-design/icons';
import {
  APPLICATION_STATUS,
  TAG_TO_TAB_MAPPING,
} from '../../../utils/constants';
import { ICONS } from '../../../utils/icons';
import { NON_WITHDRAW_STATUSES } from '../../../utils/jobCard/eligibility';
import { PRODUCT_NAME } from '../../../utils/tracking';
import { WITHDRAW_REASONS } from '../../../utils/jobCard/constants';
import { useJobPreview } from '../../../contexts';
import { useUpdateApplicationStatusMutation } from '../../../services/useUpdateApplicationStatus';
import styles from './Actions.module.scss';

const ModalContent = ({
  withdrawalReason,
  setWithdrawalReason,
  withdrawalMessage,
  setWithdrawalMessage,
}) => {
  const handleWithdrawalReasonChange = (e) => {
    const value = e.target.value;
    setWithdrawalReason(value);
    if (value !== 'Other') {
      setWithdrawalMessage('');
    }
  };

  const handleWithdrawalMessageChange = (e) => {
    setWithdrawalMessage(e.target.value);
  };

  return (
    <>
      <Typography.Text>
        Please note that once withdrawn you will not be allowed to apply for
        this job again
      </Typography.Text>
      <Form className={styles.withdrawalReasonForm}>
        <Form.Item layout="vertical" label="Select reason">
          <Radio.Group
            className={styles.withdrawalReasonRadioGroup}
            onChange={handleWithdrawalReasonChange}
            value={withdrawalReason}
          >
            {WITHDRAW_REASONS.map((reason) => (
              <Radio key={reason.value} value={reason.value}>
                {reason.label}
              </Radio>
            ))}
          </Radio.Group>
          {withdrawalReason === 'Other' && (
            <Form.Item>
              <Input.TextArea
                value={withdrawalMessage}
                onChange={handleWithdrawalMessageChange}
                placeholder="Please specify your reason"
              />
            </Form.Item>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

const Withdrawal = () => {
  const { analytics, jobId, jobData, refetch, currentTab } = useJobPreview();
  const { applicationStatus } = jobData || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawalReason, setWithdrawalReason] = useState(
    WITHDRAW_REASONS[0]?.value
  );
  const [withdrawalMessage, setWithdrawalMessage] = useState('');
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
  const { message } = App.useApp();

  const handleOk = async () => {
    const response = await updateApplicationStatus({
      job_profile_id: jobId,
      update_action: 'withdraw',
      message: withdrawalMessage || withdrawalReason,
    });

    if (response?.data?.success) {
      message.success('Application withdrawn successfully');

      setIsModalOpen(false);
      setWithdrawalReason(WITHDRAW_REASONS[0]?.value);
      setWithdrawalMessage('');
      refetch();
    } else {
      message.error('Failed to withdraw application');
    }

    analytics?.click('Withdraw Application Ok', PRODUCT_NAME, {
      currentTab,
      jobId,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setWithdrawalReason(WITHDRAW_REASONS[0]?.value);
    setWithdrawalMessage('');
  };

  const handleWithdraw = () => {
    setWithdrawalReason(WITHDRAW_REASONS[0]?.value);
    setWithdrawalMessage('');
    setIsModalOpen(true);

    analytics?.click('Expanded View - Withdraw Application', PRODUCT_NAME, {
      currentTab,
      jobId,
    });
  };

  if (applicationStatus === APPLICATION_STATUS.WITHDRAWN) {
    return (
      <div className={styles.withdrawnText}>
        <CheckCircleFilled />
        Your Application has been Withdrawn
      </div>
    );
  }

  if (
    currentTab === TAG_TO_TAB_MAPPING.applied &&
    !NON_WITHDRAW_STATUSES.includes(applicationStatus)
  ) {
    return (
      <>
        <Button
          icon={<img src={ICONS.exit} alt="exit" />}
          onClick={handleWithdraw}
          className={styles.withdrawButton}
          ghost
          type="primary"
          size="large"
        >
          Withdraw Application
        </Button>
        <Modal
          title={
            <Space>
              <WarningFilled className={styles.warningIcon} />
              <Typography.Text>Withdraw My Application</Typography.Text>
            </Space>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ModalContent
            withdrawalReason={withdrawalReason}
            setWithdrawalReason={setWithdrawalReason}
            withdrawalMessage={withdrawalMessage}
            setWithdrawalMessage={setWithdrawalMessage}
          />
        </Modal>
      </>
    );
  }

  return null;
};

export default Withdrawal;
