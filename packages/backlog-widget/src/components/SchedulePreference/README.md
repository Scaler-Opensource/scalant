# SchedulePreference Component

A React modal component for creating customized backlog study plans with API integration, built with Ant Design.

## Features

- **Modal Display**: Opens as a modal dialog for better UX
- **API Integration**: Fetches scheduled days and submits plans via API
- **Single Module Mode**: For learners with backlog in only 1 module (3 questions)
- **Multiple Modules Mode**: For learners with backlog across modules (4 questions)
- **Dynamic Day Indicators**: Shows scheduled classes based on API data
- **Day Selection**: Interactive day picker with visual indicators for regular classes
- **Time Selection**: Time picker for study schedule
- **Duration Selection**: Choose study duration (1, 2, or 3 hours)
- **Module Selection**: Dropdown for selecting which module to clear first (multiple modules mode only)
- **Form Validation**: Ensures all required fields are filled before submission
- **Loading States**: Shows loading indicators during API calls
- **Error Handling**: Graceful error handling for API failures
- **Responsive Design**: Works on desktop and mobile devices

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isSingleModule` | boolean | `true` | Whether this is for single module or multiple modules |
| `onPlanCreate` | function | `undefined` | Callback function when plan is created |
| `initialData` | object | `null` | Initial data to populate the form |
| `visible` | boolean | `false` | Whether the modal is visible |
| `onCancel` | function | `undefined` | Callback function when modal is cancelled |
| `title` | string | `'Create Your Backlog Study Plan'` | Modal title |
| `width` | number | `1200` | Modal width in pixels |
| `fetchScheduledDaysAPI` | function | `undefined` | API function to fetch scheduled days for a module |
| `submitPlanAPI` | function | `undefined` | API function to submit the created plan |
| `moduleId` | string | `undefined` | Module ID for fetching scheduled days |
| `...modalProps` | object | `{}` | Additional props passed to Ant Design Modal |

## API Integration

### Fetching Scheduled Days

The component can automatically fetch scheduled days for a module when it opens:

```jsx
const fetchScheduledDays = async (moduleId) => {
  try {
    const response = await fetch(`/api/modules/${moduleId}/scheduled-days`);
    const data = await response.json();
    return {
      data: {
        scheduledDays: data.scheduledDays // Array of day keys like ['Mon', 'Wed', 'Fri']
      }
    };
  } catch (error) {
    throw new Error('Failed to fetch scheduled days');
  }
};
```

**Expected API Response:**
```json
{
  "data": {
    "scheduledDays": ["Mon", "Wed", "Fri"]
  }
}
```

### Submitting Study Plans

The component can submit the collected data to your API:

```jsx
const submitPlan = async (planData) => {
  try {
    const response = await fetch('/api/study-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData),
    });
    const data = await response.json();
    return {
      success: true,
      message: 'Plan created successfully',
      planId: data.planId
    };
  } catch (error) {
    throw new Error('Failed to create plan');
  }
};
```

**Expected API Response:**
```json
{
  "success": true,
  "message": "Plan created successfully",
  "planId": "plan_12345"
}
```

## Usage

### Basic Usage with API Integration

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import SchedulePreference from './components/backlog_conquerer/SchedulePreference';

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlanCreate = (planData, response) => {
    console.log('Study Plan:', planData);
    console.log('API Response:', response);
    setModalVisible(false);
    // Handle successful plan creation
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const fetchScheduledDays = async (moduleId) => {
    // Your API call to fetch scheduled days
    const response = await fetch(`/api/modules/${moduleId}/scheduled-days`);
    return response.json();
  };

  const submitPlan = async (planData) => {
    // Your API call to submit the plan
    const response = await fetch('/api/study-plans', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
    return response.json();
  };

  return (
    <div>
      <Button onClick={() => setModalVisible(true)}>
        Create Study Plan
      </Button>
      
      <SchedulePreference
        visible={modalVisible}
        onPlanCreate={handlePlanCreate}
        onCancel={handleCancel}
        isSingleModule={true}
        title="Create Your Study Plan"
        fetchScheduledDaysAPI={fetchScheduledDays}
        submitPlanAPI={submitPlan}
        moduleId="module_123"
      />
    </div>
  );
}
```

### Without API Integration

You can also use the component without API integration:

```jsx
<SchedulePreference
  visible={modalVisible}
  onPlanCreate={handlePlanCreate}
  onCancel={handleCancel}
  isSingleModule={true}
  title="Create Your Study Plan"
  // No API props provided - component will work with default behavior
/>
```

### With Initial Data

```jsx
const initialData = {
  selectedDays: ['Mon', 'Wed', 'Fri'],
  selectedTime: '14:00',
  selectedDuration: '2 hours',
  selectedModule: 'System Design'
};

<SchedulePreference
  visible={modalVisible}
  onPlanCreate={handlePlanCreate}
  onCancel={handleCancel}
  isSingleModule={false}
  initialData={initialData}
  title="Edit Your Study Plan"
  fetchScheduledDaysAPI={fetchScheduledDays}
  submitPlanAPI={submitPlan}
  moduleId="module_456"
/>
```

## Data Structure

### Plan Data Sent to API

```javascript
{
  selectedDays: ['Mon', 'Wed', 'Fri'],
  selectedTime: '14:00',
  selectedDuration: '2 hours',
  selectedModule: 'System Design', // Only present when isSingleModule is false
  moduleId: 'module_123', // Module ID for API reference
  createdAt: '2024-01-15T10:30:00.000Z' // ISO timestamp
}
```

### API Response Structure

```javascript
{
  success: true,
  message: 'Plan created successfully',
  planId: 'plan_12345'
}
```

## Loading States

The component shows different loading states:

1. **Initial Loading**: When fetching scheduled days (shows spinner with "Loading scheduled days..." message)
2. **Submit Loading**: When submitting the plan (shows loading button with "Creating Plan..." text)

## Error Handling

The component handles API errors gracefully:

- **Fetch Errors**: Shows error message if scheduled days can't be fetched
- **Submit Errors**: Shows error message if plan submission fails
- **Fallback Behavior**: Works without APIs if they're not provided

## Modal Behavior

- **Opening**: Set `visible={true}` to open the modal
- **Closing**: Set `visible={false}` or call `onCancel` to close
- **Auto-close**: Modal automatically closes after successful plan creation
- **Destroy on close**: Modal content is destroyed when closed for better performance
- **Custom width**: Default width is 1200px, can be customized via `width` prop

## Styling

The component uses CSS modules with the following key classes:

- `.modal`: Modal-specific styles and Ant Design overrides
- `.container`: Main container with flexbox layout
- `.leftPanel`: Dark sidebar with introduction and backlog information
- `.rightPanel`: White main content area with the form
- `.dayButton`: Individual day selection buttons
- `.classIndicator`: Orange dot indicator for days with regular classes
- `.submitButton`: Primary action button for creating the plan

## Dependencies

- React 16.12.0+
- Ant Design 5.24.7+
- React Redux (for state management integration)

## Browser Support

- Modern browsers with ES6+ support
- Responsive design for mobile and tablet devices

## Accessibility

- Proper ARIA labels and form structure
- Keyboard navigation support
- Screen reader friendly
- High contrast color scheme
- Modal focus management

## Customization

The component can be customized by:

1. Modifying the SCSS module file
2. Overriding Ant Design theme variables
3. Adding custom validation logic
4. Extending the form fields
5. Customizing modal behavior via `modalProps`
6. Implementing custom API integration logic

## Examples

See the Storybook stories for different usage examples:
- Single Module View
- Multiple Modules View
- With Initial Data
- Custom Width Modal
- Large Modal Example
- Without API Integration

## Integration Tips

1. **State Management**: Use local state or Redux to manage modal visibility
2. **Form Reset**: The form automatically resets when the modal is closed
3. **API Integration**: Implement the required API functions for full functionality
4. **Error Handling**: The component includes built-in error handling for API calls
5. **Loading States**: Users get visual feedback during API operations
6. **Responsive Design**: The modal adapts to different screen sizes automatically

## API Requirements

### Fetch Scheduled Days API
- **Endpoint**: `/api/modules/{moduleId}/scheduled-days`
- **Method**: GET
- **Response**: JSON with `scheduledDays` array

### Submit Plan API
- **Endpoint**: `/api/study-plans`
- **Method**: POST
- **Body**: Plan data object
- **Response**: JSON with success status and plan ID
