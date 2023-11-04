export interface PaginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}
