// @flow
import { types } from '../api/websockets';
import type { Message } from '../api/websockets';
import type { ReduxState, ReduxActionWithPayload } from '../types';

export type State = {

};

export const selectors = {
  getExchangeRates: (state: ReduxState): State => state,
};

const handleWebsocketsUpdate = (state: State, payload: Message): State => {
  if (payload.type !== 'exchange_rates') return state;

  return payload.data;
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.WS_UPDATE:
      return handleWebsocketsUpdate(state, action.payload);

    default:
      return state || null;
  }
};
