import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const rtkQueryErrorToText = (
  error: FetchBaseQueryError | SerializedError | undefined
): string => {
  if (error === undefined) return '';
  if ('status' in error) {
    if ('error' in error) return error.error;
    return JSON.stringify(error.data);
  }
  return error.message ?? '';
};
