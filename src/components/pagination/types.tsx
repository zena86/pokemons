export interface PaginationProps {
  nPages: number;
  page: number;
  onChangePage: (page: number) => void;
}
