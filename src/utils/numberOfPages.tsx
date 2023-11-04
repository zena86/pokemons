export const getNumberOfPages = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit);
};
