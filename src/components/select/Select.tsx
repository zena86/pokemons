import { Option, SelectProps } from './types';
import { useState } from 'react';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const Select = ({ options, onExpanded }: SelectProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // console.log(options, onChange, onExpanded);
  // const dispatch = useDispatch();
  // const itemsPerPage = useSelector(
  //   (state: RootState) => state.itemsPerPage.itemsPerPage
  // );

  const initCurrent = options.find(
    (item) => item.value === Number(searchParams.get('limit'))
  );
  // const initCurrent = { label: '12 per page', value: 12 };
  // const [current, setCurrent] = useState(initCurrent);
  const [expanded, setExpanded] = useState(false);

  const handleOptionOnClick = (option: Option) => {
    // onChange(option);
    // setCurrent(option);
    setExpanded((e) => !e);

    localStorage.setItem('perPage', JSON.stringify(option?.value));
    router.push(
      `/?frontpage=1&search=${searchParams.get('search') || ''}&limit=${
        option.value
      }`
    );
  };

  // useEffect(() => {
  //   localStorage.setItem('perPage', JSON.stringify(current?.value));

  //   dispatch(
  //     itemsPerPageUpdated({
  //       itemsPerPage: current?.value,
  //     })
  //   );
  // }, [current, dispatch]);

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
        {/* {current?.label} */}
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
