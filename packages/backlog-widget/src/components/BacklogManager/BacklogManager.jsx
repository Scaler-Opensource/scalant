import React, { useState } from 'react';
import BacklogWidget from '../BacklogWidget';
import SchedulePreference from '../SchedulePreference';
import BacklogTimeline from '../BacklogTimeline';
import styles from './BacklogManager.module.scss';

const BacklogManager = ({
  // BacklogWidget props
  backlogStatus = 'on-track',

  // SchedulePreference props
  schedulePreferenceProps = {},

  // BacklogTimeline props
  backlogTimelineProps = {},

  // API functions
  fetchScheduledDaysAPI,
  submitPlanAPI,
  fetchBacklogItemsAPI,

  // Module ID
  moduleId,

  // Other props
  className,
  ...props
}) => {
  const [currentView, setCurrentView] = useState('widget'); // 'widget', 'schedule', 'timeline'
  const [scheduleData, setScheduleData] = useState(null);

  // Handle opening schedule preference from widget
  const handleOpenSchedule = () => {
    setCurrentView('schedule');
  };

  // Handle schedule preference submission
  const handleScheduleSubmit = (planData) => {
    setScheduleData(planData);
    setCurrentView('timeline');
  };

  // Handle closing schedule preference
  const handleScheduleCancel = () => {
    setCurrentView('widget');
  };

  // Handle closing timeline
  const handleTimelineCancel = () => {
    setCurrentView('widget');
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'schedule':
        return (
          <SchedulePreference
            visible={true}
            onCancel={handleScheduleCancel}
            onPlanCreate={handleScheduleSubmit}
            moduleId={moduleId}
            fetchScheduledDaysAPI={fetchScheduledDaysAPI}
            submitPlanAPI={submitPlanAPI}
            {...schedulePreferenceProps}
          />
        );

      case 'timeline':
        return (
          <BacklogTimeline
            visible={true}
            onCancel={handleTimelineCancel}
            moduleId={moduleId}
            fetchBacklogItemsAPI={fetchBacklogItemsAPI}
            {...backlogTimelineProps}
          />
        );

      default:
        return (
          <BacklogWidget
            status={backlogStatus}
            onClick={handleOpenSchedule}
            {...props}
          />
        );
    }
  };

  return (
    <div className={`${styles.backlogManager} ${className || ''}`}>
      {renderCurrentView()}
    </div>
  );
};

export default BacklogManager;
