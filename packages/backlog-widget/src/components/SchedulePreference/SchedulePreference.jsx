import React, { useState, useEffect } from 'react';
import {
  Typography,
  Form,
  Select,
  Button,
  TimePicker,
  message,
  Modal,
  Spin,
} from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import styles from './SchedulePreference.module.scss';
import withBacklogStore from '../../hoc/withBacklogStore';
import {
  useCreateScheduleMutation,
  useGetBacklogQuery,
} from '../../services/backlogService';

const { Title, Text } = Typography;
const { Option } = Select;

const SchedulePreference = ({
  isSingleModule = true,
  onPlanCreate,
  initialData = null,
  visible = false,
  onCancel,
  title = 'Create Your Backlog Study Plan',
  width = 1200,
  // API configuration props
  fetchScheduledDaysAPI,
  submitPlanAPI,
  moduleId, // For fetching scheduled days
  ...modalProps
}) => {
  const [createSchedule, { isLoading: isCreatingSchedule }] =
    useCreateScheduleMutation();
  const { refetch } = useGetBacklogQuery();
  const [form] = Form.useForm();
  const [selectedDays, setSelectedDays] = useState(['Mon']);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('1 hour');
  const [selectedModule, setSelectedModule] = useState(
    'Data Structures & Algorithms'
  );

  // API state
  const [scheduledDays, setScheduledDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const daysOfWeek = [
    { key: 'Mon', label: 'Mon', hasClass: false },
    { key: 'Tue', label: 'Tue', hasClass: false },
    { key: 'Wed', label: 'Wed', hasClass: false },
    { key: 'Thur', label: 'Thur', hasClass: false },
    { key: 'Fri', label: 'Fri', hasClass: false },
    { key: 'Sat', label: 'Sat', hasClass: false },
    { key: 'Sun', label: 'Sun', hasClass: false },
  ];

  const durationOptions = ['1 hour', '2 hours', '3 hours'];
  const moduleOptions = [
    'Data Structures & Algorithms',
    'System Design',
    'Database Design',
    'Web Development',
    'Machine Learning',
    'Data Science',
    'DevOps',
    'Mobile Development',
  ];

  const fetchScheduledDays = async () => {
    if (!fetchScheduledDaysAPI || !moduleId) return;

    setLoading(true);
    try {
      const response = await fetchScheduledDaysAPI(moduleId);
      if (response && response.data) {
        setScheduledDays(response.data.scheduledDays || []);
      }
    } catch {
      message.error('Failed to fetch scheduled days. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch scheduled days when component mounts or moduleId changes
  useEffect(() => {
    if (visible && fetchScheduledDaysAPI && moduleId) {
      fetchScheduledDays();
    }
  }, [visible, moduleId, fetchScheduledDaysAPI]);

  // Update days with scheduled classes when data is fetched
  useEffect(() => {
    if (scheduledDays.length > 0) {
      // Update the days array with fetched data
      // Note: We can't directly modify the constant, so we'll use it in render
    }
  }, [scheduledDays]);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
      setSelectedDays(initialData.selectedDays || ['Mon']);
      setSelectedTime(initialData.selectedTime || null);
      setSelectedDuration(initialData.selectedDuration || '1 hour');
      setSelectedModule(
        initialData.selectedModule || 'Data Structures & Algorithms'
      );
    }
  }, [initialData, form]);

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleModuleChange = (module) => {
    setSelectedModule(module);
  };

  const isFormValid = () => {
    return selectedDays.length > 0 && selectedTime && selectedDuration;
  };

  const handleCreatePlan = async () => {
    if (!isFormValid()) {
      message.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const planData = {
        selected_days: selectedDays,
        selected_time: selectedTime ? selectedTime.format('HH:mm') : null,
        number_of_hours: selectedDuration?.split?.(' ')?.[0],
      };

      // Call API to submit the plan
      const response = await createSchedule({ payload: planData });
      console.log('response', response);
      if (response?.data?.success) {
        message.success('Study plan created successfully!');
      } else {
        throw new Error(response?.message || 'Failed to create plan');
      }
    } catch (error) {
      message.error(`Failed to create study plan: ${error.message}`);
    } finally {
      await refetch();
      setSubmitting(false);
      onCancel?.();
      onPlanCreate?.();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Get days with updated scheduled class information
  const getDaysWithScheduledInfo = () => {
    return daysOfWeek.map((day) => ({
      ...day,
      hasClass: scheduledDays.includes(day.key),
    }));
  };

  if (loading) {
    return (
      <Modal
        open={visible}
        onCancel={handleCancel}
        width={width}
        footer={null}
        onClose={handleCancel}
        className={styles.modal}
        {...modalProps}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
          }}
        >
          <Spin size="large" tip="Loading scheduled days..." />
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      width={width}
      footer={null}
      destroyOnClose
      className={styles.modal}
      {...modalProps}
    >
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.introducingSection}>
            <Text className={styles.sectionLabel}>INTRODUCING</Text>
            <Title level={3} className={styles.introducingTitle}>
              A Backlog plan which is customised{' '}
              <span className={styles.underline}>just for you</span>
            </Title>
          </div>

          <div className={styles.backlogsSection}>
            <Text className={styles.sectionLabel}>BACKLOGS</Text>
            <div className={styles.backlogPoints}>
              <div className={styles.backlogPoint}>
                <span className={styles.plusIcon}>+</span>
                <Text className={styles.backlogText}>
                  Severely hinder your progress
                </Text>
              </div>
              <div className={styles.backlogPoint}>
                <span className={styles.plusIcon}>+</span>
                <Text className={styles.backlogText}>
                  Hampers your ability to grasp new concepts
                </Text>
              </div>
              <div className={styles.backlogPoint}>
                <span className={styles.plusIcon}>+</span>
                <Text className={styles.backlogText}>
                  Can be really stressfull
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <Title level={2} className={styles.formTitle}>
            Answer these {isSingleModule ? '3' : '4'} simple questions, to get
            your customised backlog plan
          </Title>

          <Form
            form={form}
            layout="vertical"
            className={styles.form}
            onFinish={handleCreatePlan}
          >
            {!isSingleModule && (
              <Form.Item
                label="1. Which module do you wish to clear first?"
                className={styles.formItem}
              >
                <Select
                  value={selectedModule}
                  onChange={handleModuleChange}
                  placeholder="Select a module"
                  className={styles.moduleSelect}
                >
                  {moduleOptions.map((module) => (
                    <Option key={module} value={module}>
                      {module}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item
              label={`${isSingleModule ? '1' : '2'}. Mark the days, when you want to study`}
              className={styles.formItem}
            >
              <div className={styles.daysContainer}>
                {getDaysWithScheduledInfo().map((day) => (
                  <Button
                    key={day.key}
                    type={
                      selectedDays.includes(day.key) ? 'primary' : 'default'
                    }
                    className={`${styles.dayButton} ${day.hasClass ? styles.hasClass : ''}`}
                    onClick={() => handleDayToggle(day.key)}
                  >
                    {day.label}
                    {day.hasClass && <span className={styles.classIndicator} />}
                  </Button>
                ))}
              </div>
              <div className={styles.classNote}>
                <span className={styles.orangeDot} />
                You have regular scaler classes on that day
              </div>
            </Form.Item>

            <Form.Item
              label={`${isSingleModule ? '2' : '3'}. At what time do you want to study?`}
              className={styles.formItem}
            >
              <TimePicker
                value={selectedTime}
                onChange={handleTimeChange}
                format="hh:mm A"
                className={styles.timePicker}
                suffixIcon={<ClockCircleOutlined />}
                placeholder="Select time"
              />
            </Form.Item>

            <Form.Item
              label={`${isSingleModule ? '3' : '4'}. For how long?`}
              className={styles.formItem}
            >
              <div className={styles.durationContainer}>
                {durationOptions.map((duration) => (
                  <Button
                    key={duration}
                    type={selectedDuration === duration ? 'primary' : 'default'}
                    className={styles.durationButton}
                    onClick={() => handleDurationChange(duration)}
                  >
                    {duration}
                  </Button>
                ))}
              </div>
            </Form.Item>

            <Form.Item className={styles.submitButtonContainer}>
              <Button
                type="primary"
                size="large"
                className={styles.submitButton}
                disabled={!isFormValid() || submitting}
                onClick={handleCreatePlan}
                loading={submitting}
              >
                {submitting ? 'Creating Plan...' : 'Create my plan'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default withBacklogStore(SchedulePreference);
