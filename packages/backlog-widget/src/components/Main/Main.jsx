import React, { useState } from 'react';

import BacklogWidget from '../BacklogWidget';
import SchedulePreference from '../SchedulePreference';
import BacklogPlan from '../BacklogTimeline';
import withBacklogTimeline from '../../hoc/withBacklogTimeline';

const Main = () => {
  const [scheduleModal, setScheduleModal] = useState(false);
  const [backlogPlanModal, setBacklogPlanModal] = useState(false);

  const createSchedule = () => {
    setScheduleModal(true);
  };

  const showBacklogPlan = () => {
    setBacklogPlanModal(true);
  };

  return (
    <>
      <BacklogWidget
        createSchedule={createSchedule}
        showBacklogPlan={showBacklogPlan}
      />
      <SchedulePreference
        open={scheduleModal}
        onPlanCreate={showBacklogPlan}
        onCancel={() => setScheduleModal(false)}
      />
      <BacklogPlan
        open={backlogPlanModal}
        onEditSchedule={createSchedule}
        onCancel={() => setBacklogPlanModal(false)}
      />
    </>
  );
};

export default withBacklogTimeline(Main);
