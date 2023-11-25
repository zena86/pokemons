import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../components/select/Select';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './data/createMockRouter';
import { vi } from 'vitest';

describe('Select component', () => {
  test('Click by options', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Select
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
          ]}
        />
      </RouterContext.Provider>
    );
    const element = await screen.findByText(/one/i);
    userEvent.click(element);
    const elementTwo = await screen.findByText(/two/i);
    userEvent.click(elementTwo);
    expect(await screen.findByText(/one/i)).toBeInTheDocument();
  });

  test('Empty pagination select', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Select options={[]} />
      </RouterContext.Provider>
    );

    const optionOne = screen.queryByText('one');
    expect(optionOne).toBeNull();
  });

  test('Expand select by click', async () => {
    const onExpanded = vi.fn();
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Select
          options={[
            { value: 1, label: 'one' },
            { value: 2, label: 'two' },
          ]}
          onExpanded={onExpanded}
        />
      </RouterContext.Provider>
    );

    expect(await screen.findByText(/one/i)).toBeInTheDocument();
    userEvent.click(screen.queryAllByRole('button')[0]);
    await waitFor(() => {
      expect(onExpanded).toHaveBeenCalled();
    });
  });
});
