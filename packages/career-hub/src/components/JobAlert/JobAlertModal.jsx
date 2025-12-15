import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Form, Button, Flex, message } from 'antd';
import { BellOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { closeJobAlertModal } from '../../store/dashboardSlice';
import { useCreateAlertMutation } from '../../services/alertService';
import {
  ALERT_FREQUENCY,
  ALERT_NOTIFICATION_TYPE,
} from '../../utils/constants';
import ExistingAlerts from './ExistingAlerts';
import JobAlertForm from './JobAlertForm';
import styles from './JobAlertModal.module.scss';

function JobAlertModal() {
  const dispatch = useDispatch();
  const open = useSelector(
    (state) => state.scalantCareerHub.dashboard.jobAlertModalOpen
  );

  const [activeTab, setActiveTab] = useState('create');
  const [form] = Form.useForm();
  const [createAlert, { isLoading: isCreating }] = useCreateAlertMutation();

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setActiveTab('create');
    }
  }, [open, form]);

  const onClose = () => {
    dispatch(closeJobAlertModal());
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCreateAlert = async () => {
    try {
      const values = await form.validateFields();

      // Map frequency values
      const frequencyMap = {
        realtime: ALERT_FREQUENCY.REALTIME,
        daily: ALERT_FREQUENCY.DAILY,
        alternate: ALERT_FREQUENCY.ALTERNATE_DAY,
        weekly: ALERT_FREQUENCY.WEEKLY,
      };

      // Prepare payload
      const isRealtime = values.frequency === 'realtime';
      const payload = {
        alert: {
          name: values.name,
          job_functions: values.job_functions || [],
          min_ctc: values.min_ctc,
          locations: values.locations || [],
          min_experience: values.min_experience
            ? parseInt(values.min_experience, 10)
            : 0,
          max_experience: values.max_experience
            ? parseInt(values.max_experience, 10)
            : null,
          frequency: frequencyMap[values.frequency] || ALERT_FREQUENCY.REALTIME,
          notification_type: isRealtime
            ? values.notification_type || ALERT_NOTIFICATION_TYPE.EMAIL
            : ALERT_NOTIFICATION_TYPE.EMAIL,
        },
        resume_alert: false,
      };

      const response = await createAlert(payload).unwrap();

      if (response.success && response.alert) {
        // The alert list will be automatically refetched due to tag invalidation
        form.resetFields();
        setActiveTab('existing');
        message.success('Alert created successfully');
      }
    } catch (error) {
      message.error('Failed to create alert');
      // eslint-disable-next-line no-undef
      console.error('Error creating alert:', error);
    }
  };

  const handleFormSubmit = async (payload) => {
    const fullPayload = {
      ...payload,
      resume_alert: false,
    };
    return await createAlert(fullPayload).unwrap();
  };

  const modalTitle = (
    <Flex vertical>
      <Flex justify="space-between">
        <Flex align="center" gap={8}>
          <BellOutlined className={styles.filterIcon} />
          Curate your Job Alert
        </Flex>

        <CloseOutlined onClick={onClose} />
      </Flex>
      <div className={styles.drawerHeaderSubtitle}>
        By creating a job alert, you will be notified when a job posting matches
        your preferred criteria
      </div>
    </Flex>
  );

  const modalFooter = (
    <div className={styles.modalFooter}>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button type="primary" onClick={handleCreateAlert} loading={isCreating}>
        Create Alert
      </Button>
    </div>
  );

  const createAlertContent = (
    <JobAlertForm
      form={form}
      onSubmit={handleFormSubmit}
      isSubmitting={isCreating}
    />
  );

  const existingAlertContent = <ExistingAlerts />;

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={onClose}
      footer={modalFooter}
      width={600}
      closable={false}
      className={styles.modal}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'create',
            label: 'Create alert',
            children: createAlertContent,
          },
          {
            key: 'existing',
            label: 'Existing alerts',
            children: existingAlertContent,
          },
        ]}
      />
    </Modal>
  );
}

export default JobAlertModal;
