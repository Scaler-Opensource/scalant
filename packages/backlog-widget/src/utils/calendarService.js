// Calendar service for Google Calendar integration
export class CalendarService {
  constructor(email = 'aswanth@scaler.com') {
    this.email = email;
  }

  // Generate Google Calendar URL with event details
  generateGoogleCalendarUrl(item) {
    const eventTitle = encodeURIComponent(item.title || 'Backlog Item');
    const eventDescription = encodeURIComponent(
      `Type: ${item.type || 'Task'}\nDuration: ${this.formatDuration(item.duration)}\nStatus: ${item.status || 'Pending'}`
    );

    // Set default time to next day at 10 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const startTime = tomorrow.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const endTime = new Date(tomorrow.getTime() + (item.duration || 60) * 60000)
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDescription}&dates=${startTime}/${endTime}&add=true&sf=true&output=xml`;

    return calendarUrl;
  }

  // Format duration from minutes to readable format
  formatDuration(minutes) {
    if (!minutes) return '1 hour';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  }

  // Add event to Google Calendar
  async addToGoogleCalendar(item) {
    try {
      const calendarUrl = this.generateGoogleCalendarUrl(item);

      // Open Google Calendar in a new window/tab
      const newWindow = window.open(calendarUrl, '_blank', 'width=800,height=600');

      if (!newWindow) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      return {
        success: true,
        message: 'Google Calendar opened successfully. Please confirm the event details.',
        url: calendarUrl
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to open Google Calendar',
        error
      };
    }
  }

  // Alternative method using Google Calendar API (requires authentication)
  async addToGoogleCalendarWithAPI(item) {
    // This would require Google Calendar API setup and OAuth2 authentication
    // For now, we'll use the URL method above
    return this.addToGoogleCalendar(item);
  }
}

export default CalendarService;
