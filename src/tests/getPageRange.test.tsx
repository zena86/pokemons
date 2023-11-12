import { getPageRange } from '../components/pagination/util';

describe('Function getPageRange', () => {
  test('The current page equal to the total number of pages', async () => {
    const pageRange = getPageRange(5, 5);
    expect(pageRange).toStrictEqual([3, 4, 5]);
  });
});
