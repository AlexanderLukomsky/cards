export const getResponseErrorMessage = (err: any): string => {
  console.log(err.response);

  return err.response ? err.response.data.error : 'Unexpected error';
};
