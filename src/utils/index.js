// @flow

// $FlowFixMe
export const isPromise = (p) => !!p && typeof p.then === 'function';

export const isProdEnv = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction: boolean = isProdEnv && window.location.hostname === '';
export const isStaging: boolean = isProdEnv && window.location.href.includes('staging');
