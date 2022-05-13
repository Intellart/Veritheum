// @flow
import {
  isEmpty, join, map, has, trimEnd,
} from 'lodash';
import apiClient from './axios';

export type QueryParam = {
  key: string,
  query: ?string,
}

export const getRequest = async (endpoint: string, params?: QueryParam[]|string[]): Promise<any> => {
  let url = endpoint;
  if (!isEmpty(params) && has(params, '[0].key')) {
    url += '?' + join(map(params, (param: QueryParam) => {
      if (param.query && !isEmpty(param.query)) return `${param.key}=${param.query}`;
    }), '&');
    url = trimEnd(url, '&');
  }
  if (!isEmpty(params) && !has(params, '[0].key')) {
    url += '/' + join(params, '/');
    url = trimEnd(url, '/');
  }

  const response: any = await apiClient.get(url);

  if (response.status === 200) {
    return response.data;
  }

  return null;
};

export const postRequest = async (endpoint: string, payload: any): Promise<any> => {
  const response: any = await apiClient.post(endpoint, payload);

  if (response.status === 200) {
    return response.data;
  }

  return null;
};

export const putRequest = async (endpoint: string, payload: any): Promise<any> => {
  const response: any = await apiClient.put(endpoint, payload);

  if (response.status === 200) {
    return response.data;
  }

  return null;
};

export const deleteRequest = async (endpoint: string): Promise<any> => {
  const response: any = await apiClient.delete(endpoint);

  if (response.status === 200) {
    return response.data;
  }

  return null;
};

export const orcidOAuth = async (finalEndpoint: string, payload: any): Promise<any> => {
  const authResponse: any = await apiClient.post('auth/orcid', payload);

  if (authResponse.status === 200) {
    const response: any = await apiClient.post(finalEndpoint, authResponse.data);

    if (response.status === 200) {
      return response.data;
    }
  }

  return null;
};
