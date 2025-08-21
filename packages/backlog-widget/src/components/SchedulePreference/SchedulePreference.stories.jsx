import React, { useState } from 'react';
import { Button, message } from 'antd';
import SchedulePreference from './SchedulePreference';

export default {
  title: 'Components/SchedulePreference',
  component: SchedulePreference,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isSingleModule: {
      control: 'boolean',
      description: 'Whether this is for single module or multiple modules',
    },
    onPlanCreate: {
      action: 'plan-created',
      description: 'Callback function when plan is created',
    },
    initialData: {
      control: 'object',
      description: 'Initial data to populate the form',
    },
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
    fetchScheduledDaysAPI: {
      action: 'fetch-scheduled-days',
      description: 'API function to fetch scheduled days for a module',
    },
    submitPlanAPI: {
      action: 'submit-plan',
      description: 'API function to submit the created plan',
    },
    moduleId: {
      control: 'text',
      description: 'Module ID for fetching scheduled days',
    },
  },
};

const Template = (args) => {
  const [visible, setVisible] = useState(false);
  
  const handlePlanCreate = (planData, response) => {
    message.success('Study plan created successfully!');
    console.log('Created Plan:', planData);
    console.log('API Response:', response);
    setVisible(false);
    args.onPlanCreate?.(planData, response);
  };

  const handleCancel = () => {
    setVisible(false);
    args.onCancel?.();
  };

  // Mock API functions for stories
  const mockFetchScheduledDays = async (moduleId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      data: {
        scheduledDays: ['Tue', 'Thur', 'Sat']
      }
    };
  };

  const mockSubmitPlan = async (planData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock response
    return {
      success: true,
      message: 'Plan created successfully',
      planId: 'plan_12345'
    };
  };

  return (
    <div>
      <Button 
        type="primary" 
        size="large" 
        onClick={() => setVisible(true)}
        style={{ marginBottom: '20px' }}
      >
        Open Schedule Preference Modal
      </Button>
      
      <SchedulePreference
        {...args}
        visible={visible}
        onPlanCreate={handlePlanCreate}
        onCancel={handleCancel}
        fetchScheduledDaysAPI={mockFetchScheduledDays}
        submitPlanAPI={mockSubmitPlan}
      />
    </div>
  );
};

export const SingleModule = Template.bind({});
SingleModule.args = {
  isSingleModule: true,
  title: 'Create Your Single Module Study Plan',
  moduleId: 'module_001',
};

export const MultipleModules = Template.bind({});
MultipleModules.args = {
  isSingleModule: false,
  title: 'Create Your Multi-Module Study Plan',
  moduleId: 'module_002',
};

export const WithInitialData = Template.bind({});
WithInitialData.args = {
  isSingleModule: false,
  title: 'Edit Your Study Plan',
  moduleId: 'module_003',
  initialData: {
    selectedDays: ['Mon', 'Wed', 'Fri'],
    selectedTime: null, // TimePicker will handle this internally
    selectedDuration: '2 hours',
    selectedModule: 'System Design',
  },
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  isSingleModule: true,
  title: 'Custom Width Modal',
  width: 1000,
  moduleId: 'module_004',
};

export const LargeModal = Template.bind({});
LargeModal.args = {
  isSingleModule: false,
  title: 'Large Modal Example',
  width: 1400,
  moduleId: 'module_005',
};

export const WithoutAPIs = Template.bind({});
WithoutAPIs.args = {
  isSingleModule: true,
  title: 'Modal Without API Integration',
  moduleId: null,
  // No fetchScheduledDaysAPI or submitPlanAPI provided
};
