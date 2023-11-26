import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Pagination from '@/components/pagination/Pagination';
import Search from '@/components/search/Search';
import { pokemonsRequest } from './data/pokemonsRequest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './data/createMockRouter';

describe('Pagination component', () => {
  test('Make sure the component updates URL query parameter when page changes', async () => {
    const router = createMockRouter({
      query: {
        frontpage: '1',
        search: '',
        limit: '12',
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <Search pokemonsRequest={pokemonsRequest} />
      </RouterContext.Provider>
    );

    await userEvent.click(await screen.findByText('2'));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('?frontpage=2&search=&limit=12');
    });

    await userEvent.click(await screen.findByText('108'));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith(
        '?frontpage=108&search=&limit=12'
      );
    });

    await userEvent.click(await screen.findByText('1'));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('?frontpage=1&search=&limit=12');
    });

    await userEvent.click(await screen.findByRole('next'));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('?frontpage=2&search=&limit=12');
    });

    await userEvent.click(await screen.findByRole('prev'));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('?frontpage=1&search=&limit=12');
    });
  });

  test('Case with empty params', async () => {
    const router = createMockRouter({
      query: {},
    });

    render(
      <RouterContext.Provider value={router}>
        <Search pokemonsRequest={pokemonsRequest} />
      </RouterContext.Provider>
    );

    await userEvent.click(await screen.findByText('108'));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith(
        '?frontpage=108&search=&limit=12'
      );
    });
  });

  test('Case with frontpage > 1', async () => {
    const router = createMockRouter({
      query: {
        frontpage: '2',
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <Search pokemonsRequest={pokemonsRequest} />
      </RouterContext.Provider>
    );
    await userEvent.click(await screen.findByRole('prev'));
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('?frontpage=1&search=&limit=12');
    });
  });

  test('Items per page select', async () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Search pokemonsRequest={pokemonsRequest} />
      </RouterContext.Provider>
    );

    expect(await screen.findByText(/108/i)).toBeInTheDocument();
    await userEvent.click(await screen.findByText(/6 per page/i));
    expect(router.push).toHaveBeenCalledWith('/?frontpage=1&search=&limit=6');
  });

  test('nPages < 4', async () => {
    render(<Pagination nPages={2} page={1} onChangePage={() => {}} />);
    expect(await screen.findByText(/1/i)).toBeInTheDocument();
    expect(await screen.findByText(/2/i)).toBeInTheDocument();
    expect(screen.queryByText(/3/i)).not.toBeInTheDocument();
  });

  test('page >= nPages - 2 && nPages > 3', () => {
    render(<Pagination nPages={4} page={3} onChangePage={() => {}} />);
    expect(screen.queryByText(/1/i)).toBeInTheDocument();
  });
});
