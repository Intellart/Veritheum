// @flow
import * as API from '../api';
import { types as webSocketsTypes } from './webSocketsStore';
import type { MessagePayload } from './webSocketsStore';
import type { ReduxState, ReduxActionWithPayload, ReduxAction } from '../types';

export type State = {
  id: number,
  unix_time: number,
  coin_id: string,
  created_at: string,
  updated_at: string,
  usd: number,
  cad: number,
  eur: number,
  gbp: number,
};

export const types = {
  ER_GET_RATES: 'ER/GET_RATES',
  ER_GET_RATES_PENDING: 'ER/GET_RATES_PENDING',
  ER_GET_RATES_REJECTED: 'ER/GET_RATES_REJECTED',
  ER_GET_RATES_FULFILLED: 'ER/GET_RATES_FULFILLED',
};

export const selectors = {
  getExchangeRates: (state: ReduxState): State => state.exchangeRates,
};

export const actions = {
  getRates: (): ReduxAction => ({
    type: types.ER_GET_RATES,
    payload: API.getRequest('intellart/exchange_rates'),
  }),
};

const handleWebsocketsUpdate = (state: State, payload: MessagePayload): State => {
  if (payload.type !== 'exchange_rates') return state;

  return payload.data;
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.ER_GET_RATES_FULFILLED:
      return { ...state, ...action.payload };

    case webSocketsTypes.WS_MESSAGE:
      return handleWebsocketsUpdate(state, action.payload);

    default:
      return state || null;
  }
};
