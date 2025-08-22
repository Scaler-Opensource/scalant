# Calendar Integration Feature

## Overview

The backlog widget now includes Google Calendar integration, allowing users to schedule backlog items directly to their Google Calendar. This feature is specifically configured for the email `aswanth@scaler.com`.

## Features

### 1. Calendar Button
- Each backlog item (except completed and pending ones) now has a "Schedule" button with a Google Calendar icon
- The button is styled with a green color scheme to distinguish it from other actions
- Hover effects provide visual feedback

### 2. Google Calendar Integration
- Clicking the "Schedule" button opens Google Calendar in a new window/tab
- Event details are pre-filled with:
  - Title: The backlog item title
  - Description: Type, duration, and status information
  - Date: Tomorrow at 10 AM (default)
  - Duration: Based on the item's duration or 1 hour default

### 3. Success Modal
- After successfully opening Google Calendar, a success modal appears
- The modal confirms the event was added and provides options to:
  - View the event in Google Calendar
  - Close the modal

## Technical Implementation

### Components Added

1. **CalendarService** (`src/utils/calendarService.js`)
   - Handles Google Calendar URL generation
   - Manages calendar event creation
   - Provides error handling for popup blockers

2. **CalendarSuccessModal** (`src/components/CalendarSuccessModal/`)
   - Displays success confirmation
   - Provides navigation to Google Calendar
   - Styled with modern UI elements

### Integration Points

1. **BacklogTimeline Component**
   - Added calendar button to each timeline item
   - Integrated success modal
   - Added state management for calendar operations

2. **Styling**
   - Added `.calendarButton` styles to `BacklogTimeline.module.scss`
   - Green color scheme with hover effects
   - Consistent with existing design patterns

## Usage

### For Users
1. Open the backlog timeline
2. Find any non-completed and non-pending item
3. Click the "Schedule" button (green calendar icon)
4. Google Calendar will open with pre-filled event details
5. Confirm and save the event in Google Calendar
6. A success modal will appear confirming the action

### For Developers
```javascript
import CalendarService from './utils/calendarService';

const calendarService = new CalendarService('user@example.com');
const result = await calendarService.addToGoogleCalendar(backlogItem);
```

## Configuration

### Email Configuration
The calendar service is currently configured for `aswanth@scaler.com`. To change this:

1. Update the email in `BacklogTimeline.jsx`:
```javascript
const calendarService = new CalendarService('newemail@example.com');
```

2. Or pass it as a prop:
```javascript
<BacklogTimeline userEmail="newemail@example.com" />
```

### Event Defaults
- **Default Time**: Tomorrow at 10:00 AM
- **Default Duration**: 1 hour (if not specified in backlog item)
- **Event Location**: Can be customized in the calendar service

## Error Handling

The feature includes comprehensive error handling:

1. **Popup Blockers**: Detects when popups are blocked and shows appropriate error message
2. **Network Issues**: Handles network failures gracefully
3. **Invalid Data**: Validates backlog item data before creating calendar events

## Future Enhancements

1. **Google Calendar API Integration**: Direct API integration for seamless event creation
2. **Custom Time Selection**: Allow users to choose specific times for events
3. **Recurring Events**: Support for recurring calendar events
4. **Multiple Calendar Support**: Integration with other calendar providers
5. **Event Templates**: Pre-defined event templates for different backlog types

## Testing

Run the test suite to verify calendar functionality:

```bash
npm test calendarService.test.js
```

## Dependencies

- Ant Design (for UI components)
- React (for component framework)
- No additional external dependencies required

## Browser Compatibility

- Modern browsers with popup support
- Requires JavaScript enabled
- Google Calendar must be accessible
