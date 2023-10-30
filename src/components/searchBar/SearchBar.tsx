import { FormEvent, useState } from 'react';
import { SearchBarProps } from './types';
import Input from '../input';
import Button from '../button';
import style from './style.module.scss';

const SearchBar = ({ term, onFormSubmit }: SearchBarProps) => {
  const [search, setSearch] = useState(term);

  const handleInputChange = (inputTerm: string): void => {
    setSearch(inputTerm);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedTerm = search.trim();
    localStorage.setItem('term', trimmedTerm);
    onFormSubmit(trimmedTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={style.search}>
      <Input onInputChange={handleInputChange} term={search} />
      <Button type="submit" title="Search" />
    </form>
  );
};

export default SearchBar;
