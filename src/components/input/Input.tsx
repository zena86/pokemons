// import { ChangeEvent, useState } from 'react';
import { ChangeEvent, useState } from 'react';
import styles from './style.module.scss';
// import { InputProps } from './types';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';

import { InputProps } from './types';

const Input = ({ onInputChange }: InputProps) => {
  console.log('onInputChange', onInputChange);
  // const term = useSelector((state: RootState) => state.search.term);
  const term = 'test term';
  const [search, setSearch] = useState(term);

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
