import CalendarService from '../calendarService';

describe('CalendarService', () => {
  let calendarService;

  beforeEach(() => {
    calendarService = new CalendarService('test@example.com');
  });

  describe('formatDuration', () => {
    it('should format minutes correctly', () => {
      expect(calendarService.formatDuration(30)).toBe('30m');
      expect(calendarService.formatDuration(60)).toBe('1h 0m');
      expect(calendarService.formatDuration(90)).toBe('1h 30m');
      expect(calendarService.formatDuration(120)).toBe('2h 0m');
    });

    it('should handle null/undefined duration', () => {
      expect(calendarService.formatDuration(null)).toBe('1 hour');
      expect(calendarService.formatDuration(undefined)).toBe('1 hour');
    });
  });

  describe('generateGoogleCalendarUrl', () => {
    it('should generate valid Google Calendar URL', () => {
      const item = {
        title: 'Test Item',
        type: 'lecture',
        duration: 60,
        status: 'pending'
      };

      const url = calendarService.generateGoogleCalendarUrl(item);

      expect(url).toContain('https://calendar.google.com/calendar/render');
      expect(url).toContain('action=TEMPLATE');
      expect(url).toContain('text=Test%20Item');
      expect(url).toContain('details=Type%3A%20lecture');
    });

    it('should handle missing item properties', () => {
      const item = {};
      const url = calendarService.generateGoogleCalendarUrl(item);

      expect(url).toContain('text=Backlog%20Item');
      expect(url).toContain('details=Type%3A%20Task');
    });
  });

  describe('addToGoogleCalendar', () => {
    beforeEach(() => {
      // Mock window.open
      global.window = {
        open: jest.fn().mockReturnValue({})
      };
    });

    it('should open Google Calendar successfully', async () => {
      const item = {
        title: 'Test Item',
        type: 'lecture',
        duration: 60
      };

      const result = await calendarService.addToGoogleCalendar(item);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Google Calendar opened successfully');
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining('calendar.google.com'),
        '_blank',
        'width=800,height=600'
      );
    });

    it('should handle popup blocked error', async () => {
      global.window.open = jest.fn().mockReturnValue(null);

      const item = { title: 'Test Item' };
      const result = await calendarService.addToGoogleCalendar(item);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Popup blocked');
    });
  });
});
