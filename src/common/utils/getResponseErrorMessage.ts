export const getResponseErrorMessage = (err: any): string => {
  return err.response ? err.response.data.error : 'Unexpected error';
};
