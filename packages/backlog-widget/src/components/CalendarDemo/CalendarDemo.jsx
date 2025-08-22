import React, { useState } from 'react';
import { Card, Button, Typography, Space, Divider } from 'antd';
import { CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import CalendarService from '../../utils/calendarService';
import CalendarSuccessModal from '../CalendarSuccessModal';
import styles from './CalendarDemo.module.scss';

const { Title, Text } = Typography;

const CalendarDemo = () => {
  const [successModal, setSuccessModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [calendarUrl, setCalendarUrl] = useState('');

  const calendarService = new CalendarService('aswanth@scaler.com');

  // Sample backlog items for demo
  const demoItems = [
    {
      title: 'Practice System Design Interview',
      type: 'interview',
      duration: 120,
      status: 'in_progress'
    },
    {
      title: 'Complete React Hooks Tutorial',
      type: 'lecture',
      duration: 90,
      status: 'in_progress'
    },
    {
      title: 'Solve Dynamic Programming Problems',
      type: 'problem',
      duration: 60,
      status: 'in_progress'
    }
  ];

  const handleAddToCalendar = async (item) => {
    try {
      const result = await calendarService.addToGoogleCalendar(item);

      if (result.success) {
        setSelectedItem(item);
        setCalendarUrl(result.url);
        setSuccessModal(true);
      } else {
        console.error('Failed to add to calendar:', result.message);
      }
    } catch (error) {
      console.error('Calendar error:', error);
    }
  };

  return (
    <div className={styles.demoContainer}>
      <Title level={2}>Calendar Integration Demo</Title>
      <Text type="secondary">
        This demo shows how backlog items can be scheduled to Google Calendar.
        Click the "Schedule" button on any item to add it to your calendar.
      </Text>

      <Divider />

      <div className={styles.itemsContainer}>
        {demoItems.map((item, index) => (
          <Card key={index} className={styles.itemCard}>
            <div className={styles.itemContent}>
              <div className={styles.itemInfo}>
                <Title level={4}>{item.title}</Title>
                <Space>
                  <Text type="secondary">Type: {item.type}</Text>
                  <Text type="secondary">Duration: {calendarService.formatDuration(item.duration)}</Text>
                  <Text type="secondary">Status: {item.status}</Text>
                </Space>
              </div>

              <div className={styles.itemActions}>
                <Button
                  type="default"
                  icon={<CalendarOutlined />}
                  onClick={() => handleAddToCalendar(item)}
                  className={styles.calendarButton}
                >
                  Schedule
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Divider />

      <div className={styles.features}>
        <Title level={3}>Features</Title>
        <ul>
          <li>✅ Google Calendar integration with pre-filled event details</li>
          <li>✅ Success modal with confirmation and navigation</li>
          <li>✅ Proper error handling for popup blockers</li>
          <li>✅ Responsive design with hover effects</li>
          <li>✅ Configurable for different email addresses</li>
        </ul>
      </div>

      <CalendarSuccessModal
        open={successModal}
        onClose={() => setSuccessModal(false)}
        itemTitle={selectedItem?.title}
        calendarUrl={calendarUrl}
      />
    </div>
  );
};

export default CalendarDemo;
