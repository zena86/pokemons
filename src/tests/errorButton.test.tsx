import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ErrorFallback from '../components/errorFallback/';
import { routerConfig } from '../router';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('ErrorButton Component', () => {
  test('Error Button', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['?frontpage=1'],
    });
    render(<RouterProvider router={router} />);
    const errorBtn = await screen.findByText(/error/i);
    expect(errorBtn).toBeInTheDocument();
  });

  test('ErrorFallback Component', async () => {
    const renderProviders = (ui: React.ReactElement) => render(ui, {});
    const { getByText } = renderProviders(
      <ErrorFallback text={'something went wrong'} />
    );
    const errorMessage = getByText('something went wrong');
    expect(errorMessage).toBeDefined();
  });
});
