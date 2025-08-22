# BacklogManager

A comprehensive component that manages the flow between `BacklogWidget`, `SchedulePreference`, and `BacklogTimeline`. It provides a seamless user experience where users can:

1. **Start with BacklogWidget** - See their backlog status and click to open schedule preferences
2. **Configure Schedule Preferences** - Set up study days, times, and duration
3. **View Backlog Timeline** - See their learning journey after submitting preferences

## Flow

```
BacklogWidget → SchedulePreference → BacklogTimeline
     ↓              ↓                    ↓
  Shows status   Configure plan      View timeline
  Click to open  Submit to open      Close to return
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backlogStatus` | `string` | `'on-track'` | Status of backlog clearance (`'on-track'` or `'off-track'`) |
| `moduleId` | `string` | - | ID of the module to fetch data for |
| `className` | `string` | - | Additional CSS class name |

### API Functions

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `fetchScheduledDaysAPI` | `function` | Yes | API function to fetch scheduled days for a module |
| `submitPlanAPI` | `function` | Yes | API function to submit the study plan |
| `fetchBacklogItemsAPI` | `function` | Yes | API function to fetch backlog items |

### Component-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `schedulePreferenceProps` | `object` | `{}` | Props to pass to SchedulePreference component |
| `backlogTimelineProps` | `object` | `{}` | Props to pass to BacklogTimeline component |

## Usage

### Basic Usage

```jsx
import BacklogManager from './components/BacklogManager';

const MyComponent = () => {
  const fetchScheduledDays = async (moduleId) => {
    // Fetch scheduled days from your API
    const response = await api.getScheduledDays(moduleId);
    return response;
  };

  const submitPlan = async (planData) => {
    // Submit plan to your API
    const response = await api.submitPlan(planData);
    return response;
  };

  const fetchBacklogItems = async (moduleId) => {
    // Fetch backlog items from your API
    const response = await api.getBacklogItems(moduleId);
    return response;
  };

  return (
    <BacklogManager
      moduleId="dsa-101"
      backlogStatus="on-track"
      fetchScheduledDaysAPI={fetchScheduledDays}
      submitPlanAPI={submitPlan}
      fetchBacklogItemsAPI={fetchBacklogItems}
    />
  );
};
```

### With Custom Props

```jsx
<BacklogManager
  moduleId="dsa-101"
  backlogStatus="off-track"
  schedulePreferenceProps={{
    title: 'Custom Schedule Title',
    width: 1000,
    isSingleModule: false,
  }}
  backlogTimelineProps={{
    title: 'My Learning Journey',
    width: 900,
  }}
  fetchScheduledDaysAPI={fetchScheduledDays}
  submitPlanAPI={submitPlan}
  fetchBacklogItemsAPI={fetchBacklogItems}
/>
```

## API Function Signatures

### fetchScheduledDaysAPI(moduleId)
- **Parameters**: `moduleId` (string)
- **Returns**: Promise that resolves to `{ data: { scheduledDays: string[] } }`

### submitPlanAPI(planData)
- **Parameters**: `planData` (object) - The submitted plan data
- **Returns**: Promise that resolves to success response

### fetchBacklogItemsAPI(moduleId)
- **Parameters**: `moduleId` (string)
- **Returns**: Promise that resolves to `{ data: { backlogItems: Array } }`

## State Management

The component manages its own state for:
- Current view (`widget`, `schedule`, `timeline`)
- Schedule data after submission
- Navigation between different views

## Styling

The component uses CSS modules and can be customized by:
- Passing `className` prop for additional styling
- Modifying the `BacklogManager.module.scss` file
- Using the `schedulePreferenceProps` and `backlogTimelineProps` to customize child components

## Accessibility

- Proper modal management with z-index handling
- Keyboard navigation support through Ant Design components
- Screen reader friendly with proper ARIA labels
