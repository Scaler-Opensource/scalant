# Backlog Widget

A React component for managing and displaying backlog information.

## Usage

### Basic Usage with Provider

The `BacklogWidget` component requires a Redux store context. Use the `BacklogWidgetProvider` to wrap your component:

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

### Using with Existing Redux Store

If you already have a Redux store in your app, you can add the backlog service to it:

```jsx
import { configureStore } from '@reduxjs/toolkit';
import { backlogServiceApi } from '@scalant/backlog-widget';

const store = configureStore({
  reducer: {
    // ... your other reducers
    [backlogServiceApi.reducerPath]: backlogServiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backlogServiceApi.middleware),
});

// Then use your existing Provider
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BacklogWidget 
        createSchedule={() => console.log('Create schedule')}
        showBacklogPlan={() => console.log('Show backlog plan')}
      />
    </Provider>
  );
}
```

## Components

- `BacklogWidget` - Main component for displaying backlog status
- `BacklogWidgetProvider` - Redux Provider wrapper
- `BacklogTimeline` - Timeline component for backlog items
- `SchedulePreference` - Component for managing schedule preferences
- `BacklogManager` - Manager component for backlog operations

## Props

### BacklogWidget

- `createSchedule` (function) - Callback when create schedule button is clicked
- `showBacklogPlan` (function) - Callback when show backlog plan button is clicked

## Store

The package exports a configured Redux store that includes:
- Backlog service API with RTK Query
- Proper middleware configuration
- Reducer setup
