import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routerConfig } from '../router';

describe('404 Page component', () => {
  test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/posts'],
    });
    render(<RouterProvider router={router} />);
    expect(await screen.findByText(/404/i)).toBeInTheDocument();
  });
});
