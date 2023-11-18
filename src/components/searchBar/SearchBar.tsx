import { FormEvent, useState } from 'react';
import { SearchBarProps } from './types';
import Input from '../input';
import Button from '../button';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { termUpdated } from '../../features/search/searchSlice';
import { RootState } from '../../redux/store';

const SearchBar = ({ onFormSubmit }: SearchBarProps) => {
  const term = useSelector((state: RootState) => state.search.term);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const handleInputChange = (inputTerm: string): void => {
    setSearch(inputTerm);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedTerm = search.trim();
    if (term !== trimmedTerm) {
      localStorage.setItem('term', trimmedTerm);
      dispatch(termUpdated({ term: trimmedTerm }));
      onFormSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.search}>
      <Input onInputChange={handleInputChange} />
      <Button type="submit" title="Search" />
    </form>
  );
};

export default SearchBar;
