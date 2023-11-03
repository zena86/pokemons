import { Link } from 'react-router-dom';
import { PaginationProps } from './types';
import styles from './style.module.scss';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import { memo } from 'react';

const Pagination = memo(
  ({ nPages, currentPage, setCurrentPage }: PaginationProps) => {
    const goToNextPage = () => {
      if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
      if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    const getPageRange = (currentPage: number, nPages: number) => {
      if (nPages < 4) {
        return [];
      }
      const pageRange = [1, 2, 3];
      if (currentPage > 1 && currentPage !== nPages) {
        pageRange.length = 0;
        pageRange.push(currentPage - 1);
        pageRange.push(currentPage);
        pageRange.push(currentPage + 1);
      } else if (currentPage === nPages) {
        pageRange.length = 0;
        pageRange.push(currentPage - 2);
        pageRange.push(currentPage - 1);
        pageRange.push(currentPage);
      }
      return pageRange;
    };

    const renderPageButtons = () => {
      const result = [];
      for (let i = 1; i < nPages + 1; i++) {
        result.push(
          <Link
            to={`?frontpage=${i}`}
            key={i}
            className={
              currentPage === i
                ? `${styles.btn} ${styles.active}`
                : `${styles.btn}`
            }
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Link>
        );
      }
      return result;
    };

    return (
      <nav>
        <ul className={styles.pagination}>
          <li className={styles['page-item']}>
            <Link
              to={`?frontpage=${currentPage <= 1 ? 1 : currentPage - 1}`}
              className={`${currentPage <= 1 && styles.disabled}`}
              onClick={goToPrevPage}
            >
              <FaArrowLeft />
            </Link>
          </li>

          {nPages < 4 && renderPageButtons()}

          {currentPage >= nPages - 2 && nPages > 3 && (
            <>
              <Link
                to={`?frontpage=1`}
                className={
                  currentPage === 1
                    ? `${styles.btn} ${styles.active}`
                    : `${styles.btn}`
                }
                onClick={() => setCurrentPage(1)}
              >
                1
              </Link>
              <div className={styles.dots}>
                <BsThreeDots />
              </div>
            </>
          )}

          {getPageRange(currentPage, nPages).map((page: number) => (
            <Link
              to={`?frontpage=${page}`}
              key={page}
              className={
                page === currentPage
                  ? `${styles.btn} ${styles.active}`
                  : `${styles.btn}`
              }
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Link>
          ))}

          {currentPage < nPages - 2 && nPages > 3 && (
            <>
              <div className={styles.dots}>
                <BsThreeDots />
              </div>
              <Link
                to={`?frontpage=${nPages}`}
                className={
                  nPages === currentPage
                    ? `${styles.btn} ${styles.active}`
                    : `${styles.btn}`
                }
                onClick={() => setCurrentPage(nPages)}
              >
                {nPages}
              </Link>
            </>
          )}

          <li className={styles['page-item']}>
            <Link
              to={`?frontpage=${
                currentPage >= nPages ? nPages : currentPage + 1
              }`}
              className={`${currentPage >= nPages && styles.disabled}`}
              onClick={goToNextPage}
            >
              <FaArrowRight />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
);

export default Pagination;
