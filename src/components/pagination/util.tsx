export const getPageRange = (page: number, nPages: number) => {
  if (nPages < 4) {
    return [];
  }
  const pageRange = [1, 2, 3];
  if (page > 1 && page !== nPages) {
    pageRange.length = 0;
    pageRange.push(page - 1);
    pageRange.push(page);
    pageRange.push(page + 1);
  } else if (page === nPages) {
    pageRange.length = 0;
    pageRange.push(page - 2);
    pageRange.push(page - 1);
    pageRange.push(page);
  }
  return pageRange;
};
