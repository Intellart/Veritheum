// @flow
import { apiClient } from './axios';

export const getRequest = async (endpoint: string): Promise<any> => {
  const response: any = await apiClient.get(endpoint);

  return response.data;
};

export const postRequest = async (endpoint: string, payload: any): Promise<any> => {
  const response: any = await apiClient.post(endpoint, payload);

  return response.data;
};

export const putRequest = async (endpoint: string, payload: any): Promise<any> => {
  await apiClient.put(endpoint, payload);
};

export const deleteRequest = async (endpoint: string): Promise<any> => {
  await apiClient.delete(endpoint);

  return null;
};
