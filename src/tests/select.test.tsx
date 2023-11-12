import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../components/select/Select';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import React from 'react';

describe('Pagination select component', () => {
  test('Test pagination select component', async () => {
    const onChange = vi.fn();
    render(
      <Select
        options={[
          { value: 1, label: 'one' },
          { value: 2, label: 'two' },
        ]}
        onChange={onChange}
      />
    );
    const element = await screen.findByText(/one/i);
    userEvent.click(element);
    const elementTwo = await screen.findByText(/two/i);
    userEvent.click(elementTwo);
    expect(await screen.findByText(/one/i)).toBeInTheDocument();
    expect(onChange).toHaveBeenCalled();
  });

  test('Test empty pagination select component', async () => {
    render(<Select options={[]} onChange={() => {}} />);
    const optionOne = screen.queryByText('one');
    expect(optionOne).toBeNull();
  });

  test('Test expanded pagination select component', async () => {
    const onExpanded = vi.fn();
    render(
      <Select
        options={[
          { value: 1, label: 'one' },
          { value: 2, label: 'two' },
        ]}
        onChange={() => {}}
        onExpanded={onExpanded}
      />
    );

    expect(await screen.findByText(/one/i)).toBeInTheDocument();
    const menuButton = await screen.queryAllByRole('button');
    console.log('menuButton', menuButton[0].outerHTML);
    userEvent.click(menuButton[0]);
    //expect(onExpanded).toHaveBeenCalled();
    await waitFor(() => {
      expect(onExpanded).toHaveBeenCalled();
      //expect(state.expanded).toBe(true);
      //expect(setState).toHaveBeenCalled();
      // expect(setState).toHaveBeenCalledWith();
      // expect(state).toBe(true);
    });
  });
});
