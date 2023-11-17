import { rtkQueryErrorToText } from '../utils/rtkQueryErrorToText';

describe('Function rtkQuerErrorToText', () => {
  test('If function get error', async () => {
    const result = rtkQueryErrorToText({
      status: 'FETCH_ERROR',
      error: 'TypeError: Failed to fetch',
    });
    expect(result).toBe('TypeError: Failed to fetch');
  });

  test('If function get an empty object', async () => {
    const result = rtkQueryErrorToText({});
    expect(result).toBe('');
  });

  test('If function get undefined', async () => {
    const result = rtkQueryErrorToText(undefined);
    expect(result).toBe('');
  });
});
