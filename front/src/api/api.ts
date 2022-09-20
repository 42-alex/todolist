import axios from 'axios';
import { baseApiUrl } from '../constants';

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  // withCredentials: true,
  // headers: {},
});

export type APIResponseType<D = {}, M = {}> = {
  data: D
  meta: M
}

export {
  axiosInstance
}
