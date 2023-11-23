import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FormEvent, useState } from 'react';
import { SearchBarProps } from './types';
import Input from '../input/Input';
import Button from '../button/Button';
import { termUpdated } from '@/redux/features/search/searchSlice';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const SearchBar = ({ onFormSubmit }: SearchBarProps) => {
  const term = useSelector((state: RootState) => state.search.term);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleInputChange = (inputTerm: string): void => {
    setSearch(inputTerm);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedTerm = search.trim();
    if (term !== trimmedTerm) {
      localStorage.setItem('term', trimmedTerm);
      dispatch(termUpdated({ term: trimmedTerm }));
      router.replace(router.asPath);
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
