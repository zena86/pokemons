import { CHANGE_TERM } from '../constants';
import { initialValue } from '../context/init';
import { searchReducer } from '../context/reducer';

describe('searchReducer', () => {
  test('Case with term change', async () => {
    const result = searchReducer(initialValue, {
      type: CHANGE_TERM,
      payload: { term: 'test term', pokemonsPerPage: [] },
    });
    expect(result).toStrictEqual({ term: 'test term', pokemonsPerPage: [] });
  });

  test('Case with term change without payload', async () => {
    const result = searchReducer(initialValue, {
      type: CHANGE_TERM,
    });
    expect(result).toStrictEqual({ term: '', pokemonsPerPage: [] });
  });

  test('Case with unknown action type', async () => {
    const result = searchReducer(initialValue, {
      type: 'Unknown action type',
      payload: { term: 'test term', pokemonsPerPage: [] },
    });
    expect(result).toStrictEqual(initialValue);
  });
});
