import React, { useState } from 'react';
import { Modal, Tabs, Input, Select, Radio, Button } from 'antd';
import { BellOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { closeJobAlertModal } from '../../store/dashboardSlice';
import styles from './JobAlertModal.module.scss';

function JobAlertModal() {
  const dispatch = useDispatch();
  const open = useSelector(
    (state) => state.scalantCareerHub.dashboard.jobAlertModalOpen
  );

  const [activeTab, setActiveTab] = useState('create');

  const onClose = () => {
    dispatch(closeJobAlertModal());
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCreateAlert = () => {
    // Placeholder - will be implemented later
    onClose();
  };

  const modalTitle = (
    <div className={styles.modalTitle}>
      <div className={styles.modalTitleHeader}>
        <div className={styles.modalTitleContent}>
          <BellOutlined />
          <span>Curate your Job Alert</span>
        </div>
        <CloseOutlined onClick={onClose} className={styles.modalCloseIcon} />
      </div>
      <div className={styles.modalDescription}>
        By creating a job alert, you will be notified when a job posting matches
        your preferred criteria
      </div>
    </div>
  );

  const modalFooter = (
    <div className={styles.modalFooter}>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button type="primary" onClick={handleCreateAlert}>
        Create Alert
      </Button>
    </div>
  );

  const createAlertContent = (
    <div className={styles.createAlertContent}>
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Alert Name <span className={styles.requiredAsterisk}>*</span>
        </label>
        <Input placeholder="Give your job alert a name" />
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Job Types <span className={styles.requiredAsterisk}>*</span>
        </label>
        <Select
          placeholder="Select job profile"
          className={styles.formInput}
          suffixIcon
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Minimum CTC (in Lakhs)?{' '}
          <span className={styles.requiredAsterisk}>*</span>
        </label>
        <Input defaultValue="8" />
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel}>
          What is your expected CTC (in Lakhs)?{' '}
          <span className={styles.requiredAsterisk}>*</span>
        </label>
        <Input defaultValue="12" />
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Locations? <span className={styles.requiredAsterisk}>*</span>
        </label>
        <Select
          mode="multiple"
          placeholder="Select locations"
          className={styles.formInput}
          defaultValue={['Bengaluru', 'Mumbai', 'Chennai', 'Pune']}
          options={[
            { label: 'Bengaluru', value: 'Bengaluru' },
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Chennai', value: 'Chennai' },
            { label: 'Pune', value: 'Pune' },
          ]}
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Experience (Years)? <span className={styles.requiredAsterisk}>*</span>
        </label>
        <div className={styles.experienceInputs}>
          <Input placeholder="Minimum" />
          <Input placeholder="Maximum" />
        </div>
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Alert Frequency <span className={styles.requiredAsterisk}>*</span>
        </label>
        <Radio.Group className={styles.radioGroup}>
          <Radio value="realtime">Realtime</Radio>
          <Radio value="daily">Daily</Radio>
          <Radio value="alternate">Every alternate day</Radio>
          <Radio value="weekly">Weekly</Radio>
        </Radio.Group>
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Alert mode <span className={styles.requiredAsterisk}>*</span>
        </label>
        <Radio.Group className={styles.radioGroup}>
          <Radio value="email">Email</Radio>
          <Radio value="whatsapp">Whatsapp</Radio>
          <Radio value="both">Both</Radio>
        </Radio.Group>
      </div>
    </div>
  );

  const existingAlertContent = (
    <div className={styles.existingAlertContent}>
      Existing alerts will be displayed here
    </div>
  );

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
