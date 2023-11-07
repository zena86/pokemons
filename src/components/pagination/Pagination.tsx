import { PaginationProps } from './types';
import styles from './style.module.scss';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import { memo } from 'react';
import { getPageRange } from './util';

const Pagination = memo(({ nPages, page, onChangePage }: PaginationProps) => {
  const renderPageButtons = () => {
    const result = [];
    for (let i = 1; i < nPages + 1; i++) {
      result.push(
        <div
          key={i}
          className={
            page === i ? `${styles.btn} ${styles.active}` : `${styles.btn}`
          }
          onClick={() => onChangePage(i)}
        >
          {i}
        </div>
      );
    }
    return result;
  };

  return (
    <nav>
      <ul className={styles.pagination}>
        <li className={styles['page-item']}>
          <div
            className={`${page <= 1 && styles.disabled}`}
            onClick={() => {
              if (page !== 1) onChangePage(page - 1);
            }}
          >
            <FaArrowLeft />
          </div>
        </li>

        {nPages < 4 && renderPageButtons()}

        {page >= nPages - 2 && nPages > 3 && (
          <>
            <div
              className={
                page === 1 ? `${styles.btn} ${styles.active}` : `${styles.btn}`
              }
              onClick={() => onChangePage(1)}
            >
              1
            </div>
            <div className={styles.dots}>
              <BsThreeDots />
            </div>
          </>
        )}

        {getPageRange(page, nPages).map((p: number) => (
          <div
            key={p}
            className={
              p === page ? `${styles.btn} ${styles.active}` : `${styles.btn}`
            }
            onClick={() => onChangePage(p)}
          >
            {p}
          </div>
        ))}

        {page < nPages - 2 && nPages > 3 && (
          <>
            <div className={styles.dots}>
              <BsThreeDots />
            </div>
            <div
              className={
                nPages === page
                  ? `${styles.btn} ${styles.active}`
                  : `${styles.btn}`
              }
              onClick={() => onChangePage(nPages)}
            >
              {nPages}
            </div>
          </>
        )}

        <li className={styles['page-item']}>
          <div
            className={`${page >= nPages && styles.disabled}`}
            onClick={() => {
              if (page !== nPages) onChangePage(page + 1);
            }}
          >
            <FaArrowRight />
          </div>
        </li>
      </ul>
    </nav>
  );
});

export default Pagination;
