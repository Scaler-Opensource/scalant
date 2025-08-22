# Backlog Widget

A React component for managing and displaying backlog information.

## Usage

### Basic Usage with Provider

The `BacklogWidget` component requires a React Context provider. Use the `BacklogWidgetProvider` to wrap your component:

```jsx
import { BacklogWidget, BacklogWidgetProvider } from '@scalant/backlog-widget';

function App() {
  return (
    <BacklogWidgetProvider>
      <BacklogWidget 
        createSchedule={() => console.log('Create schedule')}
        showBacklogPlan={() => console.log('Show backlog plan')}
      />
    </BacklogWidgetProvider>
  );
}
```

### Using with Custom Base URL

You can customize the base URL for API calls:

```jsx
import { BacklogWidget, BacklogWidgetProvider } from '@scalant/backlog-widget';

function App() {
  return (
    <BacklogWidgetProvider baseUrl="https://api.example.com">
      <BacklogWidget 
        createSchedule={() => console.log('Create schedule')}
        showBacklogPlan={() => console.log('Show backlog plan')}
      />
    </BacklogWidgetProvider>
  );
}
```

## Components

- `BacklogWidget` - Main component for displaying backlog status
- `BacklogWidgetProvider` - React Context Provider wrapper
- `BacklogTimeline` - Timeline component for backlog items
- `SchedulePreference` - Component for managing schedule preferences
- `BacklogManager` - Manager component for backlog operations

## Props

### BacklogWidget

- `createSchedule` (function) - Callback when create schedule button is clicked
- `showBacklogPlan` (function) - Callback when show backlog plan button is clicked

## Context

The package exports a React Context that includes:
- Backlog state management
- API functions for backlog operations
- Loading and error states
- Custom hooks for easy integration

### Available Hooks

- `useBacklog()` - Access to all backlog context functions and state
- `useGetBacklogQuery()` - Hook for fetching backlog data
- `useCreateScheduleMutation()` - Hook for creating schedules
- `useGetInitialDataQuery()` - Hook for fetching initial data

### API Functions

- `getBacklog()` - Fetch backlog information
- `createSchedule(payload)` - Create a new schedule
- `getInitialData()` - Fetch initial dashboard data
- `getScheduledDays(moduleId)` - Get scheduled days for a module
- `submitPlan(planData)` - Submit a backlog plan
- `getBacklogItems(moduleId)` - Get backlog items for a module
