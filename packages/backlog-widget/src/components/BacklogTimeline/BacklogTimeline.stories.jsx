import React, { useState } from 'react';
import { Button, message } from 'antd';
import BacklogTimeline from './BacklogTimeline';
import SchedulePreference from '../SchedulePreference/SchedulePreference';

export default {
  title: 'Components/BacklogTimeline',
  component: BacklogTimeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An empowering and enthusiastic timeline component that displays backlog items with smart status-based sorting, progress tracking, and motivational messaging. Features include: Progress Overview with statistics, Infinity symbol for completed items, Motivational messages for each item, Progress bars for in-progress items, Beautiful animations and hover effects, and Bottom motivation section. Shows only the last 2 completed items to help learners focus on their current backlog while celebrating their achievements.',
      },
    },
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Whether the modal is visible',
    },
    onCancel: {
      action: 'modal-cancelled',
      description: 'Callback function when modal is cancelled',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    width: {
      control: 'number',
      description: 'Modal width',
    },
    fetchBacklogItemsAPI: {
      action: 'fetch-backlog-items',
      description: 'API function to fetch backlog items',
    },
    moduleId: {
      control: 'text',
      description: 'Module ID for fetching backlog items',
    },
  },
};

// Mock API function for stories - moved outside Template for global access
const mockFetchBacklogItems = async (moduleId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data with more completed items to show infinity symbol
  return {
    data: {
      backlogItems: [
        {
          id: 1,
          type: 'Mock Interview',
          status: 'Complete',
          title: 'System Design Mock Interview',
          artifact_link: 'https://example.com/interview1',
          approx_time: '45',
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          type: 'Lecture Recording',
          status: 'Inprogress',
          title: 'Advanced Data Structures',
          artifact_link: 'https://example.com/lecture1',
          approx_time: '90',
          created_at: '2024-01-14T14:30:00Z'
        },
        {
          id: 3,
          type: 'Problem',
          status: 'Inprogress',
          title: 'Dynamic Programming - Longest Common Subsequence',
          artifact_link: 'https://example.com/problem1',
          approx_time: '30',
          created_at: '2024-01-13T09:15:00Z'
        },
        {
          id: 4,
          type: 'Module Test',
          status: 'Complete',
          title: 'Algorithms Module Assessment',
          artifact_link: 'https://example.com/test1',
          approx_time: '60',
          created_at: '2024-01-12T16:45:00Z'
        },
        {
          id: 5,
          type: 'Mock Interview',
          status: 'Complete',
          title: 'Behavioral Questions Practice',
          artifact_link: 'https://example.com/interview2',
          approx_time: '30',
          created_at: '2024-01-11T11:20:00Z'
        },
        {
          id: 6,
          type: 'Lecture Recording',
          status: 'Complete',
          title: 'Graph Algorithms Fundamentals',
          artifact_link: 'https://example.com/lecture2',
          approx_time: '75',
          created_at: '2024-01-10T09:00:00Z'
        },
        {
          id: 7,
          type: 'Problem',
          status: 'Complete',
          title: 'Binary Search Implementation',
          artifact_link: 'https://example.com/problem2',
          approx_time: '20',
          created_at: '2024-01-09T15:30:00Z'
        },
        {
          id: 8,
          type: 'Module Test',
          status: 'Complete',
          title: 'Basic Data Structures Quiz',
          artifact_link: 'https://example.com/test2',
          approx_time: '45',
          created_at: '2024-01-08T13:00:00Z'
        },
        {
          id: 9,
          type: 'Mock Interview',
          status: 'Complete',
          title: 'Technical Coding Round',
          artifact_link: 'https://example.com/interview3',
          approx_time: '60',
          created_at: '2024-01-07T10:30:00Z'
        }
      ]
    }
  };
};

const Template = (args) => {
  const [visible, setVisible] = useState(false);
  
  const handleCancel = () => {
    setVisible(false);
    args.onCancel?.();
  };

  return (
    <div>
      <Button 
        type="primary" 
        size="large" 
        onClick={() => setVisible(true)}
        style={{ marginBottom: '20px' }}
      >
        Open Backlog Timeline Modal
      </Button>
      
      <BacklogTimeline
        {...args}
        visible={visible}
        onCancel={handleCancel}
        fetchBacklogItemsAPI={mockFetchBacklogItems}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Your Backlog Timeline',
  moduleId: 'module_001',
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'DSA Module Backlog Items',
  moduleId: 'module_002',
};

export const LargeModal = Template.bind({});
LargeModal.args = {
  title: 'Complete Backlog Overview',
  width: 1200,
  moduleId: 'module_003',
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  title: 'Empty Backlog Timeline',
  moduleId: 'module_004',
  fetchBacklogItemsAPI: async () => ({
    data: { backlogItems: [] }
  }),
};

export const WithError = Template.bind({});
WithError.args = {
  title: 'Error State Demo',
  moduleId: 'module_005',
  fetchBacklogItemsAPI: async () => {
    throw new Error('Failed to fetch data');
  },
};

export const EmpoweringFeatures = Template.bind({});
EmpoweringFeatures.args = {
  visible: true,
  title: '🚀 Your Learning Journey',
  width: 900,
  moduleId: 'empowering-demo',
  fetchBacklogItemsAPI: mockFetchBacklogItems,
};
EmpoweringFeatures.parameters = {
  docs: {
    description: {
      story: 'This story showcases all the empowering features including progress overview, motivational messages, progress bars, and beautiful animations. Perfect for demonstrating how the component motivates learners.',
    },
  },
};
