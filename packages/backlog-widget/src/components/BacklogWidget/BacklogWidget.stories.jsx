import React from 'react';
import BacklogWidget from './BacklogWidget';

export default {
  title: 'Components/BacklogWidget',
  component: BacklogWidget,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A status widget that displays backlog clearance progress with encouraging messages and a call-to-action button.',
      },
    },
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['on-track', 'off-track'],
      description: 'The status of the backlog clearance',
    },
  },
};

const Template = (args) => <BacklogWidget {...args} />;

export const OnTrack = Template.bind({});
OnTrack.args = {
  status: 'on-track',
};
OnTrack.parameters = {
  docs: {
    description: {
      story: 'Backlog widget showing on-track status with green checkmark icon.',
    },
  },
};

export const OffTrack = Template.bind({});
OffTrack.args = {
  status: 'off-track',
};
OffTrack.parameters = {
  docs: {
    description: {
      story: 'Backlog widget showing off-track status with red warning icon.',
    },
  },
};
