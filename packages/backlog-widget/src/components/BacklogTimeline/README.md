# BacklogTimeline Component

A React modal component that displays backlog items in a beautiful timeline format, built with Ant Design.

## Features

- **Timeline Display**: Beautiful left-aligned timeline showing backlog items
- **API Integration**: Fetches backlog items from your backend API
- **Status Indicators**: Visual status indicators for Complete, In Progress, and Incomplete items
- **Type Icons**: Different icons for different types of backlog items
- **Interactive Cards**: Clickable cards with hover effects
- **Artifact Links**: Direct links to artifacts when available
- **Loading States**: Shows loading indicators during API calls
- **Error Handling**: Graceful error handling with retry functionality
- **Empty State**: Friendly message when no backlog items exist
- **Responsive Design**: Works on desktop and mobile devices

## Data Structure

The component expects backlog items in the following format:

```javascript
[
  {
    id: 1,
    type: 'Mock Interview/ Lecture recording / Problem / Module Test',
    status: 'Complete / Inprogress/ Incomplete',
    title: 'Item title or description',
    artifact_link: 'https://example.com/link',
    approx_time: '45', // in minutes or time string
    created_at: '2024-01-15T10:00:00Z'
  }
]
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | boolean | `false` | Controls modal visibility |
| `onCancel` | function | `undefined` | Called when modal is cancelled |
| `title` | string | `'Your Backlog Timeline'` | Modal title |
| `width` | number | `1000` | Modal width in pixels |
| `fetchBacklogItemsAPI` | function | `undefined` | API function to fetch backlog items |
| `moduleId` | string | `undefined` | Module ID for fetching backlog items |
| `...modalProps` | object | `{}` | Additional Modal props |

## API Integration

### Fetching Backlog Items

The component automatically fetches backlog items when opened:

```jsx
const fetchBacklogItems = async (moduleId) => {
  try {
    const response = await fetch(`/api/modules/${moduleId}/backlog-items`);
    const data = await response.json();
    return {
      data: {
        backlogItems: data.backlogItems
      }
    };
  } catch (error) {
    throw new Error('Failed to fetch backlog items');
  }
};
```

**Expected API Response:**
```json
{
  "data": {
    "backlogItems": [
      {
        "id": 1,
        "type": "Mock Interview",
        "status": "Complete",
        "title": "System Design Mock Interview",
        "artifact_link": "https://example.com/interview1",
        "approx_time": "45",
        "created_at": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

## Usage

### Basic Usage with API Integration

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import BacklogTimeline from './components/BacklogTimeline';

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const fetchBacklogItems = async (moduleId) => {
    const response = await fetch(`/api/modules/${moduleId}/backlog-items`);
    return response.json();
  };

  return (
    <div>
      <Button onClick={() => setModalVisible(true)}>
        View Backlog Timeline
      </Button>
      
      <BacklogTimeline
        visible={modalVisible}
        onCancel={handleCancel}
        title="Your Backlog Timeline"
        fetchBacklogItemsAPI={fetchBacklogItems}
        moduleId="module_123"
      />
    </div>
  );
}
```

### Without API Integration

You can also use the component without API integration by passing data directly:

```jsx
<BacklogTimeline
  visible={modalVisible}
  onCancel={handleCancel}
  title="Static Backlog Timeline"
  // No API props provided
/>
```

## Status Types

The component automatically handles different status types:

- **Complete**: Green color with checkmark icon
- **In Progress**: Blue color with clock icon  
- **Incomplete**: Red color with exclamation icon

## Item Types

Different item types get different icons:

- **Mock Interview**: Play circle icon
- **Lecture Recording**: File text icon
- **Problem**: File text icon
- **Module Test**: File text icon

## Interactive Features

- **Clickable Cards**: Click on any card to open the artifact link
- **Hover Effects**: Cards lift and show shadows on hover
- **Status Colors**: Different border colors based on status
- **Artifact Links**: Direct links to view artifacts

## Loading States

The component shows different states:

1. **Loading**: Spinner with "Loading your backlog items..." message
2. **Error**: Error message with retry button
3. **Empty**: Friendly message when no items exist
4. **Content**: Timeline with all backlog items

## Error Handling

The component handles errors gracefully:

- **API Errors**: Shows error message with retry button
- **Network Issues**: User-friendly error messages
- **Fallback Behavior**: Graceful degradation

## Styling

The component uses CSS modules with the following key classes:

- `.modal`: Modal-specific styles and Ant Design overrides
- `.timeline`: Timeline styling and layout
- `.timelineCard`: Individual item cards
- `.status-complete`: Complete status styling
- `.status-inprogress`: In Progress status styling
- `.status-incomplete`: Incomplete status styling

## Responsive Design

- **Desktop**: Full timeline with left-aligned items
- **Mobile**: Optimized layout with stacked details
- **Tablet**: Adaptive sizing and spacing

## Dependencies

- React 16.12.0+
- Ant Design 5.24.7+
- React Redux (for state management integration)

## Browser Support

- Modern browsers with ES6+ support
- Responsive design for mobile and tablet devices

## Accessibility

- Proper ARIA labels and structure
- Keyboard navigation support
- Screen reader friendly
- High contrast color scheme
- Focus management

## Customization

The component can be customized by:

1. Modifying the SCSS module file
2. Overriding Ant Design theme variables
3. Customizing status colors and icons
4. Adding custom item types
5. Implementing custom API integration logic

## Examples

See the Storybook stories for different usage examples:
- Default Timeline
- Custom Title
- Large Modal
- Empty State
- Error State

## Integration Tips

1. **State Management**: Use local state to manage modal visibility
2. **API Integration**: Implement the required API function for fetching data
3. **Error Handling**: The component includes built-in error handling
4. **Loading States**: Users get visual feedback during API operations
5. **Responsive Design**: The modal adapts to different screen sizes automatically

## API Requirements

### Fetch Backlog Items API
- **Endpoint**: `/api/modules/{moduleId}/backlog-items`
- **Method**: GET
- **Response**: JSON with `backlogItems` array

## Performance Considerations

- **Lazy Loading**: Items are fetched only when modal opens
- **Efficient Rendering**: Uses React's optimized rendering
- **Memory Management**: Modal content is destroyed when closed
- **API Caching**: Consider implementing caching for better performance
