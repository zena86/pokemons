import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../components/select/Select';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Pagination select component', () => {
  test('Click by options', async () => {
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

  test('Empty pagination select', async () => {
    render(<Select options={[]} onChange={() => {}} />);
    const optionOne = screen.queryByText('one');
    expect(optionOne).toBeNull();
  });

  test('Expand select by click', async () => {
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
    userEvent.click(screen.queryAllByRole('button')[0]);
    await waitFor(() => {
      expect(onExpanded).toHaveBeenCalled();
    });
  });
});
