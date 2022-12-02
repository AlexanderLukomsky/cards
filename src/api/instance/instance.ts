import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_LOCALHOST,
  withCredentials: true,
});
// process.env.REACT_APP_LOCALHOST || process.env.REACT_APP_BACK_URL
