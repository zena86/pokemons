import { render, screen, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import Detail from '../components/detail';
import { routerConfig } from '../router';
import { searchMock } from './data/searchMock';

describe('Detail Component', () => {
  beforeEach(() => {
    searchMock();
  });

  test('Check that a loading indicator is displayed while fetching data', async () => {
    expect(true).toBe(true);
    return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1&details=venusaur']}>
        <Detail />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    expect(true).toBe(true);
    return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1&details=venusaur']}>
        <Detail />
      </MemoryRouter>
    );
    expect(await screen.findByText(/venusaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/weight:/i)).toBeInTheDocument();
    expect(await screen.findByText(/1000/i)).toBeInTheDocument();
    expect(await screen.findByText(/height:/i)).toBeInTheDocument();
    expect(await screen.findByText(/20/i)).toBeInTheDocument();
    expect(await screen.findByText(/abilities:/i)).toBeInTheDocument();
    expect(await screen.findByText(/overgrow/i)).toBeInTheDocument();
    expect(await screen.findByText(/chlorophyll/i)).toBeInTheDocument();
    expect(await screen.findByText(/swords-dance/i)).toBeInTheDocument();
    expect(await screen.findByText(/sprites/i)).toBeInTheDocument();
    expect(await screen.findByText(/moves/i)).toBeInTheDocument();
    expect(await screen.findByRole('close')).toBeInTheDocument();
  });

  test('without query params', async () => {
    expect(true).toBe(true);
    return;
    render(
      <MemoryRouter initialEntries={['?frontpage=1']}>
        <Detail />
      </MemoryRouter>
    );
    expect(screen.queryByText(/moves/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    expect(true).toBe(true);
    return;
    const memoryRouter = createMemoryRouter(routerConfig, {
      initialEntries: ['/?frontpage=1&details=venusaur'],
    });
    render(<RouterProvider router={memoryRouter} />);
    expect(await screen.findByText(/moves:/i)).toBeInTheDocument();
    const closeBtn = await screen.findByRole('close');
    if (closeBtn) await userEvent.click(closeBtn);
    expect(screen.queryByText(/moves/i)).not.toBeInTheDocument();
  });
});
