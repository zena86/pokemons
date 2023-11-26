import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorFallback from '../components/errorFallback/ErrorFallback';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('ErrorFallback Component', () => {
  test('ErrorFallback Component', async () => {
    const renderProviders = (ui: React.ReactElement) => render(ui, {});
    const { getByText } = renderProviders(
      <ErrorFallback text={'something went wrong'} />
    );
    const errorMessage = getByText('something went wrong');
    expect(errorMessage).toBeDefined();
  });
});
