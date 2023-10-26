import { IPokemon } from '../components/searchResults/types';

export const filter = (list: IPokemon[], term: string) => {
  return list.filter((el) =>
    el.name.toLowerCase().includes(term.trim().toLowerCase())
  );
};
