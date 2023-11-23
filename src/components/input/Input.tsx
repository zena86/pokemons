import { ChangeEvent, useState } from 'react';
import styles from './style.module.scss';
import { InputProps } from './types';
import { useSearchParams } from 'next/navigation';

const Input = ({ onInputChange }: InputProps) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    setSearch(value);
    onInputChange(value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      value={search}
      onChange={handleInputChange}
      placeholder="Pokemon's name"
    />
  );
};

export default Input;
