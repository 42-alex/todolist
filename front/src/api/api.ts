import axios from 'axios';
import { baseApiUrl } from '../constants';

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  // withCredentials: true,
  // headers: {},
});

export {
  axiosInstance
}
