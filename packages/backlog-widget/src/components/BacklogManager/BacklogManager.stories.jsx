import React from 'react';
import BacklogManager from './BacklogManager';

export default {
  title: 'Components/BacklogManager',
  component: BacklogManager,
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive component that manages the flow between BacklogWidget, SchedulePreference, and BacklogTimeline. Clicking on the BacklogWidget opens the SchedulePreference, and submitting the schedule preference opens the BacklogTimeline.',
      },
    },
  },
  argTypes: {
    backlogStatus: {
      control: { type: 'select' },
      options: ['on-track', 'off-track'],
      description: 'Status of the backlog clearance',
    },
    moduleId: {
      control: { type: 'text' },
      description: 'ID of the module to fetch data for',
    },
    onScheduleSubmit: {
      action: 'schedule submitted',
      description: 'Called when schedule preference is submitted',
    },
    onTimelineClose: {
      action: 'timeline closed',
      description: 'Called when timeline is closed',
    },
  },
};

// Mock API functions for the story
const mockFetchScheduledDaysAPI = async (moduleId) => {
  return {
    data: {
      scheduledDays: ['Mon', 'Wed', 'Fri'],
    },
  };
};

const mockSubmitPlanAPI = async (planData) => {
  console.log('Plan submitted:', planData);
  return { success: true };
};

const mockFetchBacklogItemsAPI = async (moduleId) => {
  return {
    data: {
      backlogItems: [
        {
          id: 1,
          title: 'Basic Data Structures Quiz',
          type: 'test',
          status: 'complete',
          approx_time: 30,
        },
        {
          id: 2,
          title: 'Technical Coding Round',
          type: 'interview',
          status: 'complete',
          approx_time: 45,
        },
        {
          id: 3,
          title: 'Dynamic Programming - Longest',
          type: 'problem',
          status: 'inprogress',
          approx_time: 30,
          artifact_link: 'https://example.com/problem1',
        },
        {
          id: 4,
          title: 'Advanced Data Structures',
          type: 'lecture',
          status: 'inprogress',
          approx_time: 90,
          artifact_link: 'https://example.com/lecture1',
        },
      ],
    },
  };
};

const Template = (args) => (
  <div style={{ padding: '20px', maxWidth: '800px' }}>
    <BacklogManager
      {...args}
      fetchScheduledDaysAPI={mockFetchScheduledDaysAPI}
      submitPlanAPI={mockSubmitPlanAPI}
      fetchBacklogItemsAPI={mockFetchBacklogItemsAPI}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  backlogStatus: 'on-track',
  moduleId: 'dsa-101',
};

export const OffTrack = Template.bind({});
OffTrack.args = {
  backlogStatus: 'off-track',
  moduleId: 'dsa-101',
};

export const WithCustomScheduleProps = Template.bind({});
WithCustomScheduleProps.args = {
  backlogStatus: 'on-track',
  moduleId: 'dsa-101',
  schedulePreferenceProps: {
    title: 'Custom Schedule Title',
    width: 1000,
  },
};

export const WithCustomTimelineProps = Template.bind({});
WithCustomTimelineProps.args = {
  backlogStatus: 'on-track',
  moduleId: 'dsa-101',
  backlogTimelineProps: {
    title: 'Custom Timeline Title',
    width: 900,
  },
};
