export const getResponseErrorMessage = (err: any): string =>
  err.response ? err.response.data.error : 'Unexpected error';
