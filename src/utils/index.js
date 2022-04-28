// @flow
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

export const formatDate = (date: Date): string|null => {
  if (!date) return null;

  return format(utcToZonedTime(new Date(date), 'Europe/Berlin'), 'MMMM') + ' ' + format(utcToZonedTime(new Date(date), 'Europe/Berlin'), 'do') + ' ' + format(utcToZonedTime(new Date(date), 'Europe/Berlin'), 'yyyy');
};

// $FlowFixMe
export const isPromise = (p) => !!p && typeof p.then === 'function';

export const isProdEnv = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction: boolean = isProdEnv && window.location.hostname === '';
export const isStaging: boolean = isProdEnv && window.location.href.includes('staging');
