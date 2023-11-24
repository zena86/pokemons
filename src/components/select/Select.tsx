import { Option, SelectProps } from './types';
import { useState } from 'react';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { NUM_OF_START_PAGE } from '@/constants';

const Select = ({ options, onExpanded }: SelectProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initCurrent = options.find(
    (item) => item.value === Number(searchParams.get('limit'))
  );

  const [expanded, setExpanded] = useState(false);

  const handleOptionOnClick = (option: Option) => {
    setExpanded((e) => !e);

    // localStorage.setItem('perPage', JSON.stringify(option?.value));
    router.push(
      `/?frontpage=${NUM_OF_START_PAGE}&search=${
        searchParams.get('search') || ''
      }&limit=${option.value}`
    );
  };

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
        {initCurrent?.label || '12 per page'}
      </button>
      <div className={styles.options}>
        {options?.map((option) => (
          <button
            key={option.value}
            className={styles.option}
            type="button"
            value={option.value}
            disabled={option.value === initCurrent?.value}
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
