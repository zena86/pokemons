import { NextRouter } from 'next/router';
import { vi } from 'vitest';

export function createMockRouter(router: Partial<NextRouter>) {
  return {
    pathname: '',
    query: {},
    isFallback: false,
    back: vi.fn(),
    beforePopState: vi.fn(),
    push: vi.fn(),
    ...router,
  };
}
