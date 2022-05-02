// @flow
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { get } from 'lodash';

export const formatDate = (date: Date): string|null => {
  if (!date) return null;

  return format(utcToZonedTime(new Date(date), 'Europe/Berlin'), 'MMMM') + ' ' + format(utcToZonedTime(new Date(date), 'Europe/Berlin'), 'do') + ' ' + format(utcToZonedTime(new Date(date), 'Europe/Berlin'), 'yyyy');
};

// $FlowFixMe
export const isPromise = (p) => !!p && typeof p.then === 'function';

export const isProdEnv = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction: boolean = isProdEnv && window.location.hostname === 'veritheum.intellart.ca';
export const isStaging: boolean = isProdEnv && window.location.href.includes('staging');

export const buildRedirectLink = (path: string): string => window.location.origin + path;

export const orcidOAuthLink = (path: string): string => {
  const baseURL = isProdEnv ? 'https://orcid.org' : 'https://sandbox.orcid.org';
  const clientId = get(process.env, 'REACT_APP_ORCID_CLIENT_ID', '');

  return `${baseURL}/oauth/authorize?client_id=${clientId}&response_type=code&scope=/authenticate&redirect_uri=${buildRedirectLink(path)}`;
};
