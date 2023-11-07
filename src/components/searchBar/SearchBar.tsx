import { FormEvent, useContext, useState } from 'react';
import { SearchBarProps } from './types';
import Input from '../input';
import Button from '../button';
import style from './style.module.scss';
import {
  SearchContext,
  SearchDispatchContext,
} from '../../context/searchContext';
import { CHANGE_TERM } from '../../context/constants';

const SearchBar = ({ onFormSubmit }: SearchBarProps) => {
  const { term } = useContext(SearchContext);
  const dispatch = useContext(SearchDispatchContext);
  const [search, setSearch] = useState(term);

  const handleInputChange = (inputTerm: string): void => {
    setSearch(inputTerm);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedTerm = search.trim();
    localStorage.setItem('term', trimmedTerm);
    onFormSubmit(term !== trimmedTerm);
    dispatch({
      type: CHANGE_TERM,
      payload: trimmedTerm,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={style.search}>
      <Input onInputChange={handleInputChange} />
      <Button type="submit" title="Search" />
    </form>
  );
};

export default SearchBar;
