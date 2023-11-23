import { ChangeEvent, useState } from 'react';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { InputProps } from './types';

const Input = ({ onInputChange }: InputProps) => {
  const term = useSelector((state: RootState) => state.search.term);
  const [search, setSearch] = useState(term || '');

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
