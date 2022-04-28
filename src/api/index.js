// @flow
import apiClient from './axios';

export const getRequest = async (endpoint: string): Promise<any> => {
  const response: any = await apiClient.get(endpoint);

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
  await apiClient.put(endpoint, payload);
};

export const deleteRequest = async (endpoint: string): Promise<any> => {
  await apiClient.delete(endpoint);
};
