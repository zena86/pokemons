import { useEffect, useState } from 'react';
import { Option, SelectProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './style.module.scss';
import { itemsPerPageUpdated } from '../../features/itemsPerPage/itemsPerPageSlice';

const Select = ({ options, onChange, onExpanded }: SelectProps) => {
  const dispatch = useDispatch();
  const itemsPerPage = useSelector(
    (state: RootState) => state.itemsPerPage.itemsPerPage
  );
  const initCurrent = options.find((item) => item.value === itemsPerPage);
  const [current, setCurrent] = useState(initCurrent);
  const [expanded, setExpanded] = useState(false);

  const handleOptionOnClick = (option: Option) => {
    onChange(option);
    setCurrent(option);
    setExpanded((e) => !e);
  };

  useEffect(() => {
    localStorage.setItem('perPage', JSON.stringify(current?.value));

    dispatch(
      itemsPerPageUpdated({
        itemsPerPage: current?.value,
      })
    );
  }, [current, dispatch]);

  return (
    <div
      className={`${styles.select} ${expanded && styles['select--expanded']}`}
    >
      <button
        className={styles.toggle}
        type="button"
        onClick={() => {
          setExpanded(!expanded);
          if (onExpanded) onExpanded();
        }}
      >
        {current?.label}
      </button>
      <div className={styles.options}>
        {options?.map((option) => (
          <button
            key={option.value}
            className={styles.option}
            type="button"
            value={option.value}
            disabled={option.value === current?.value}
            onClick={() => handleOptionOnClick(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
