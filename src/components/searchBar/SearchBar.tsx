import { useRouter } from 'next/router';
import styles from './style.module.scss';
import { FormEvent, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { ITEMS_ON_PAGE, NUM_OF_START_PAGE } from '@/constants';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const {limit} = router.query;

  const handleInputChange = (inputTerm: string): void => {
    setSearch(inputTerm);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedTerm = search.trim();
    router.push(
      `/?frontpage=${NUM_OF_START_PAGE}&search=${trimmedTerm || ''}&limit=${
        limit || ITEMS_ON_PAGE
      }`
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <Input onInputChange={handleInputChange} />
      <Button type="submit" title="Search" />
    </form>
  );
};

export default SearchBar;
