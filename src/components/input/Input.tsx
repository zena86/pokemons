import { ChangeEvent, useState } from 'react';
import { InputProps } from './types';
import style from './style.module.scss';

const Input = ({ term, onInputChange }: InputProps) => {
  const [search, setSearch] = useState(term);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    onInputChange(e.target.value);
  };

  return (
    <input
      className={style.input}
      type="text"
      value={search}
      onChange={handleInputChange}
      placeholder="Pokemon's name"
    />
  );
};

export default Input;
