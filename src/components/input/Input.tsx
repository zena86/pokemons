import { ChangeEvent, useState } from 'react';
import styles from './style.module.scss';
import { InputProps } from './types';
import { useRouter } from 'next/router';

const Input = ({ onInputChange }: InputProps) => {
  const router = useRouter();
  const {search} = router.query;

  const [term, setTerm] = useState(search || '');

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    setTerm(value);
    onInputChange(value);
  };

  return (
    <input
      className={styles.input}
      type="text"
      value={term}
      onChange={handleInputChange}
      placeholder="Pokemon's name"
    />
  );
};

export default Input;
