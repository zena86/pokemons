import styles from './style.module.scss';
import { FormEvent, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const SearchBar = () => {
  // const term = useSelector((state: RootState) => state.search.term);
  // const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleInputChange = (inputTerm: string): void => {
    setSearch(inputTerm);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedTerm = search.trim();
    // if (term !== trimmedTerm) {
    //   localStorage.setItem('term', trimmedTerm);
    //   // dispatch(termUpdated({ term: trimmedTerm }));
    //   // router.replace(router.asPath);
    //   //onFormSubmit();
    // }
    localStorage.setItem('term', trimmedTerm);
    router.push(
      `/?frontpage=1&search=${trimmedTerm || ''}&limit=${
        searchParams.get('limit') || 12
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
