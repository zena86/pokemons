import { IPokemon } from '../components/searchResults/types';

export const filter = (list: IPokemon[], term: string) => {
  return list.filter((item) => {
    return item.name.toLowerCase().search(term.trim().toLowerCase()) !== -1;
  });
};
