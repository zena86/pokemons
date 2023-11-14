import { ChangeEvent, useState } from 'react';
import style from './style.module.scss';
// import { SearchContext } from '../../context/searchContext';
import { InputProps } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Input = ({ onInputChange }: InputProps) => {
  // const { term } = useContext(SearchContext);
  const term = useSelector((state: RootState) => state.search.term);

  const [search, setSearch] = useState(term);

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    setSearch(value);
    onInputChange(value);
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
