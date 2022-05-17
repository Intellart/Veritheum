// @flow
import axios from 'axios';
import {
  get, has, isEmpty, omit,
} from 'lodash';
import { isDevelopment } from '../utils';
import { getItem, setItem } from '../localStorage';
import { store } from '../store';
import { actions } from '../store/userStore';

export const requestTimeoutMs: number = 120000;
const baseURL = isDevelopment ? 'http://localhost:' + get(process.env, 'REACT_APP_LOCAL_API_PORT', '3000') : get(process.env, 'REACT_APP_API_BASE_URL', '');

const apiClient: any = axios.create({
  baseURL: baseURL + '/api/' + get(process.env, 'REACT_APP_API_VERSION', 'v1'),
  timeout: requestTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const _jwt = getItem('_jwt');
  if (!isEmpty(_jwt) && _jwt) {
    config.headers.Authorization = `Bearer ${_jwt}`;

    return config;
  }

  return config;
}, (error) => Promise.reject(error));

apiClient.interceptors.response.use((response) => {
  if (has(response, 'data._jwt')) {
    const _jwt = get(response, 'data._jwt');
    setItem('_jwt', _jwt);

    return omit(response, 'data._jwt');
  }

  if (has(response, 'headers._jwt')) {
    const _jwt = get(response, 'headers._jwt');
    setItem('_jwt', _jwt);
  }

  return response;
}, (error) => {
  if (get(error, 'response.status') === 401) store.dispatch(actions.clearUser());

  return Promise.reject(error);
},
);

export default apiClient;
