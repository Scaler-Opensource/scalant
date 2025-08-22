import React from 'react';
import { Modal, Typography, Button, Space } from 'antd';
import { CheckCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './CalendarSuccessModal.module.scss';

const { Title, Text } = Typography;

const CalendarSuccessModal = ({
  open,
  onClose,
  itemTitle,
  calendarUrl
}) => {
  const handleViewCalendar = () => {
    if (calendarUrl) {
      window.open(calendarUrl, '_blank');
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={400}
      centered
      className={styles.successModal}
    >
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <CheckCircleOutlined className={styles.successIcon} />
        </div>

        <Title level={4} className={styles.title}>
          Event Added Successfully!
        </Title>

        <Text className={styles.description}>
          "{itemTitle}" has been added to your Google Calendar.
        </Text>

        <Space direction="vertical" className={styles.actions}>
          <Button
            type="primary"
            icon={<CalendarOutlined />}
            onClick={handleViewCalendar}
            className={styles.viewButton}
          >
            View in Calendar
          </Button>

          <Button
            onClick={handleClose}
            className={styles.closeButton}
          >
            Close
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default CalendarSuccessModal;
