import { formatDate } from '../dateUtils';

describe('formatDate', () => {
  it('should format a valid date string correctly', () => {
    const dateString = '2023-01-15T10:30:00Z';
    const result = formatDate(dateString);
    expect(result).toContain('2023');
  });

  it('should return "N/A" for undefined input', () => {
    const result = formatDate(undefined);
    expect(result).toBe('N/A');
  });

  it('should return "N/A" for empty string', () => {
    const result = formatDate('');
    expect(result).toBe('N/A');
  });
});
