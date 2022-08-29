import { AxiosError, AxiosResponse } from "axios";
export const thunkHandler =
   async <D>(asyncFn: Promise<AxiosResponse>, rejectWithValue: (value: string) => void) => {
      try {
         const res = await asyncFn;
         return res.data;
      } catch (error: any) {
         const errorMessage = (error as AxiosError).response ?
            error.response.data.error :
            'An error has occurred. Please try again later'
         return rejectWithValue(errorMessage);
      }
   };

