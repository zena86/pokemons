import { useState } from 'react';
import { SelectProps } from './types';
import styles from './style.module.scss';

const Select = ({ options, onChange }: SelectProps) => {
  const [current, setCurrent] = useState(options[0]);
  const [expanded, setExpanded] = useState(false);

  if (options.length === 0) {
    return null;
  }

  return (
    <div
      className={`${styles.select} ${expanded && styles['select--expanded']}`}
    >
      <button
        className={styles.toggle}
        type="button"
        onClick={() => setExpanded(!expanded)}
      >
        {current.label}
      </button>
      <div className={styles.options}>
        {options.map((option) => (
          <button
            key={option.value}
            className={styles.option}
            type="button"
            value={option.value}
            disabled={option.value === current.value}
            onClick={() => {
              onChange(option, current);
              setCurrent(option);
              setExpanded((e) => !e);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
