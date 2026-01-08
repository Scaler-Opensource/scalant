import React, { useEffect, useState } from 'react';
import { Switch, Button, Flex, message, Form } from 'antd';
import {
  AlertFilled,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import {
  useFetchAlertsQuery,
  useUpdateAlertStatusMutation,
  useDeleteAlertMutation,
  useUpdateAlertMutation,
} from '../../services/alertService';
import { useDispatch } from 'react-redux';
import { setAlerts } from '../../store/alertSlice';
import {
  ALERT_FREQUENCY,
  ALERT_FREQUENCY_LABELS,
  ALERT_NOTIFICATION_TYPE,
  ALERT_NOTIFICATION_LABELS,
  ALERT_STATUS,
} from '../../utils/constants';
import { PRODUCT_NAME } from '../../utils/tracking';
import JobAlertForm from './JobAlertForm';
import styles from './ExistingAlerts.module.scss';

function ExistingAlerts({ analytics }) {
  const dispatch = useDispatch();
  const { data: alerts = [], isLoading, error } = useFetchAlertsQuery();
  const [updateAlertStatus] = useUpdateAlertStatusMutation();
  const [deleteAlert] = useDeleteAlertMutation();
  const [updateAlert, { isLoading: isUpdating }] = useUpdateAlertMutation();
  const [editingAlertId, setEditingAlertId] = useState(null);
  const [editForm] = Form.useForm();

  useEffect(() => {
    if (alerts) {
      dispatch(setAlerts(alerts));
    }
  }, [alerts, dispatch]);

  const getFrequencyLabel = (frequency) => {
    return (
      ALERT_FREQUENCY_LABELS[frequency] ||
      ALERT_FREQUENCY_LABELS[ALERT_FREQUENCY.REALTIME]
    );
  };

  const getNotificationLabel = (notificationType) => {
    return (
      ALERT_NOTIFICATION_LABELS[notificationType] ||
      ALERT_NOTIFICATION_LABELS[ALERT_NOTIFICATION_TYPE.EMAIL]
    );
  };

  const isActive = (status) => status === ALERT_STATUS.ACTIVE;

  const handleToggle = async (alertId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === ALERT_STATUS.ACTIVE
          ? ALERT_STATUS.INACTIVE
          : ALERT_STATUS.ACTIVE;
      await updateAlertStatus({
        id: alertId,
        status: newStatus,
      }).unwrap();
      message.success(
        `Alert ${
          newStatus === ALERT_STATUS.ACTIVE ? 'activated' : 'deactivated'
        } successfully`
      );
    } catch (err) {
      message.error('Failed to update alert status');
      // eslint-disable-next-line no-undef
      console.error('Error updating alert status:', err);
    }
  };

  const handleEdit = (alertId) => {
    analytics?.click('Existing Alerts - Edit', PRODUCT_NAME);
    setEditingAlertId(alertId);
    // Form will be prefilled via JobAlertForm's useEffect
  };

  const handleCancelEdit = () => {
    analytics?.click('Existing Alerts - Cancel Edit', PRODUCT_NAME);
    setEditingAlertId(null);
    editForm.resetFields();
  };

  const handleUpdateAlert = async (payload) => {
    try {
      analytics?.click('Existing Alerts - Update Alert', PRODUCT_NAME);
      await updateAlert({
        id: editingAlertId,
        payload,
      }).unwrap();
      message.success('Alert updated successfully');
      setEditingAlertId(null);
      editForm.resetFields();
    } catch (err) {
      message.error('Failed to update alert');
      // eslint-disable-next-line no-undef
      console.error('Error updating alert:', err);
      throw err;
    }
  };

  const handleDelete = async (alertId) => {
    try {
      analytics?.click('Existing Alerts - Delete', PRODUCT_NAME);
      await deleteAlert(alertId).unwrap();
      message.success('Alert deleted successfully');
    } catch (err) {
      message.error('Failed to delete alert');
      // eslint-disable-next-line no-undef
      console.error('Error deleting alert:', err);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.existingAlertContent}>
        <div className={styles.loadingText}>Loading alerts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.existingAlertContent}>
        <div className={styles.errorText}>Error loading alerts</div>
      </div>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <div className={styles.existingAlertContent}>
        <div className={styles.emptyText}>No alerts found</div>
      </div>
    );
  }

  return (
    <div className={styles.existingAlertContent}>
      {alerts.map((alert) => {
        const alertData = alert.attributes || alert;
        const alertId = alert.id || alertData.id;
        const active = isActive(alertData.status);
        const frequencyLabel = getFrequencyLabel(alertData.frequency);
        const notificationLabel = getNotificationLabel(
          alertData.notification_type
        );
        const isEditing = editingAlertId === alertId;

        return (
          <div key={alertId} className={styles.alertCard}>
            <Flex align="center" className={styles.alertHeader}>
              <AlertFilled
                className={classNames(styles.alertIcon, {
                  [styles.inactiveIcon]: !active,
                })}
              />
              <div>{alertData.name}</div>
            </Flex>

            <div className={styles.alertSettings}>
              <Flex align="center" gap={16} wrap>
                <Flex align="center" gap={8}>
                  <Switch
                    checked={active}
                    onChange={() => handleToggle(alertId, alertData.status)}
                    size="small"
                    disabled={isEditing}
                  />
                  <span>Active</span>
                </Flex>

                <Flex align="center" gap={8}>
                  <ClockCircleOutlined />
                  <span>{frequencyLabel}</span>
                </Flex>

                <Flex align="center" gap={8}>
                  <AlertFilled />
                  <span>{notificationLabel}</span>
                </Flex>
              </Flex>
            </div>

            {!isEditing && (
              <div className={styles.alertActions}>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(alertId)}
                  className={styles.deleteButton}
                >
                  Delete
                </Button>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(alertId)}
                  className={styles.editButton}
                >
                  Edit
                </Button>
              </div>
            )}

            {isEditing && (
              <div className={styles.editFormCard}>
                <JobAlertForm
                  form={editForm}
                  initialValues={alertData}
                  onSubmit={handleUpdateAlert}
                  isSubmitting={isUpdating}
                />
                <Flex
                  gap={8}
                  justify="flex-end"
                  style={{ marginTop: '1.6rem' }}
                >
                  <Button onClick={handleCancelEdit} disabled={isUpdating}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    onClick={async () => {
                      try {
                        const values = await editForm.validateFields();
                        const frequencyMap = {
                          realtime: ALERT_FREQUENCY.REALTIME,
                          daily: ALERT_FREQUENCY.DAILY,
                          alternate: ALERT_FREQUENCY.ALTERNATE_DAY,
                          weekly: ALERT_FREQUENCY.WEEKLY,
                        };
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
                            frequency:
                              frequencyMap[values.frequency] ||
                              ALERT_FREQUENCY.REALTIME,
                            notification_type: isRealtime
                              ? values.notification_type ||
                                ALERT_NOTIFICATION_TYPE.EMAIL
                              : ALERT_NOTIFICATION_TYPE.EMAIL,
                          },
                        };
                        await handleUpdateAlert(payload);
                      } catch {
                        // Validation or API error - already handled in handleUpdateAlert
                      }
                    }}
                    loading={isUpdating}
                  >
                    Update Alert
                  </Button>
                </Flex>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ExistingAlerts;
