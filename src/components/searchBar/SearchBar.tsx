import styles from './style.module.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { termUpdated } from '../../features/search/searchSlice';
// import { RootState } from '../../redux/store';
import { FormEvent, useState } from 'react';
import { SearchBarProps } from './types';
import Input from '../input/Input';
import Button from '../button/Button';

const SearchBar = ({ onFormSubmit }: SearchBarProps) => {
  // const term = useSelector((state: RootState) => state.search.term);
  // const dispatch = useDispatch();

  const term = 'test term';
  const [search, setSearch] = useState('');

  const handleInputChange = (inputTerm: string): void => {
    console.log(inputTerm);
    setSearch(inputTerm);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('onFormSubmit', onFormSubmit);
    const trimmedTerm = search.trim();
    if (term !== trimmedTerm) {
      localStorage.setItem('term', trimmedTerm);
      // dispatch(termUpdated({ term: trimmedTerm }));
      onFormSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <Input onInputChange={handleInputChange} />
      <Button type="submit" title="Search" />
    </form>
  );
};

export default SearchBar;
