import { render, screen } from '@testing-library/react';
import Select from '../components/select/Select';

describe('Pagination select component', () => {
  // test('Test pagination select component', async () => {
  //   render(
  //     <Select
  //       options={[
  //         { value: 1, label: 'one' },
  //         { value: 2, label: 'two' },
  //         // { label: '6 per page', value: 6 },
  //         // { label: '12 per page', value: 12 },
  //         // { label: '18 per page', value: 18 },
  //       ]}
  //       onChange={() => {}}
  //     />
  //   );
  //   console.debug();
  //   // expect(await screen.findByText(/one/i)).toBeInTheDocument();
  //   // expect(await screen.findByText(/two/i)).toBeInTheDocument();
  // });

  test('Test empty pagination select component', async () => {
    render(<Select options={[]} onChange={() => {}} />);
    const optionOne = screen.queryByText('one');
    expect(optionOne).toBeNull();
  });
});
