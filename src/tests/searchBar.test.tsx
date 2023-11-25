import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './data/createMockRouter';
import SearchBar from '@/components/searchBar/SearchBar';
import userEvent from '@testing-library/user-event';

describe('SearchBar Component', () => {
  test('Submit on button click', async () => {
    const router = createMockRouter({
      query: {
        frontpage: '2',
        search: '',
        limit: '12',
      },
    });
    render(
      <RouterContext.Provider value={router}>
        <SearchBar />
      </RouterContext.Provider>
    );

    const searchBtn = await screen.findByRole('button', { name: /search/i });
    expect(searchBtn).toBeInTheDocument();
    if (searchBtn) await userEvent.click(searchBtn);
    expect(router.push).toHaveBeenCalledWith('/?frontpage=1&search=&limit=12');
  });

  test('Submit on button click in case with empty params', async () => {
    const router = createMockRouter({
      query: {},
    });
    render(
      <RouterContext.Provider value={router}>
        <SearchBar />
      </RouterContext.Provider>
    );

    const searchBtn = await screen.findByRole('button', { name: /search/i });
    expect(searchBtn).toBeInTheDocument();
    if (searchBtn) await userEvent.click(searchBtn);
    expect(router.push).toHaveBeenCalledWith('/?frontpage=1&search=&limit=12');
  });

  test('Input on change', async () => {
    const router = createMockRouter({
      query: {
        frontpage: '2',
        search: '',
        limit: '12',
      },
    });
    render(
      <RouterContext.Provider value={router}>
        <SearchBar />
      </RouterContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Pokemon's name/i);

    await userEvent.type(input, 'test text');
    expect(input).toHaveValue('test text');
  });
});
