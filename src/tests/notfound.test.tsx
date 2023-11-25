import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './data/createMockRouter';
import NotFound from '@/pages/404';

describe('NotFound Page', () => {
  test('NotFound Page', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <NotFound />
      </RouterContext.Provider>
    );

    const item = screen.queryByText(/404/i);
    expect(item).toBeInTheDocument();
  });
});
