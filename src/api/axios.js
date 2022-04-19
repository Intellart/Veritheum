// @flow

import axios from 'axios';
import { get } from 'lodash';
import { isDevelopment } from '../utils';

export const requestTimeoutMs: number = 120000;
const baseURL = isDevelopment ? 'http://localhost:' + get(process.env, 'REACT_APP_LOCAL_API_PORT', '3000') : get(process.env, 'REACT_APP_API_BASE_URL', '');

// $FlowFixMe
export const apiClient = axios.create({
  baseURL,
  timeout: requestTimeoutMs,
  headers: {
    Authorization: `Bearer ${get(process.env, 'REACT_APP_API_KEY', '')}`,
    'Content-Type': 'application/json',
  },
});
