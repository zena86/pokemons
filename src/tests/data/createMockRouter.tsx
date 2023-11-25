import { NextRouter } from 'next/router';
import { vi } from 'vitest';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    query: {},
    isFallback: false,
    back: vi.fn(),
    beforePopState: vi.fn(),
    ...router,
  };
}
