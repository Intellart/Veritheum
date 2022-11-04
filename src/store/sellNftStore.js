// @flow
import {
  values, keyBy, omit,
} from 'lodash';
import { toast } from 'react-toastify';
import * as API from '../api';
import type { ReduxActionWithPayload, ReduxAction, ReduxState } from '../types';
import type { Nft } from './nftStore';


export type State = {
  [string]: Nft,
};

export const types = {
  NFT_FETCH_SELL_NFTS: 'NFT/FETCH_SELL_NFTS',
  NFT_FETCH_SELL_NFTS_PENDING: 'NFT/FETCH_SELL_NFTS_PENDING',
  NFT_FETCH_SELL_NFTS_REJECTED: 'NFT/FETCH_SELL_NFTS_REJECTED',
  NFT_FETCH_SELL_NFTS_FULFILLED: 'NFT/FETCH_SELL_NFTS_FULFILLED',

  NFT_APPROVE_SELL_NFT: 'NFT/APPROVE_SELL_NFT',
  NFT_APPROVE_SELL_NFT_PENDING: 'NFT/APPROVE_SELL_NFT_PENDING',
  NFT_APPROVE_SELL_NFT_REJECTED: 'NFT/APPROVE_SELL_NFT_REJECTED',
  NFT_APPROVE_SELL_NFT_FULFILLED: 'NFT/APPROVE_SELL_NFT_FULFILLED',

  NFT_DECLINE_SELL_NFT: 'NFT/DECLINE_SELL_NFT',
  NFT_DECLINE_SELL_NFT_PENDING: 'NFT/DECLINE_SELL_NFT_PENDING',
  NFT_DECLINE_SELL_NFT_REJECTED: 'NFT/DECLINE_SELL_NFT_REJECTED',
  NFT_DECLINE_SELL_NFT_FULFILLED: 'NFT/DECLINE_SELL_NFT_FULFILLED',
};

export const selectors = {
  getSellNfts: (state: ReduxState): Nft[] => values(state.sellNfts),
};

export const actions = {
  fetchSellNfts: (): ReduxAction => ({
    type: types.NFT_FETCH_SELL_NFTS,
    payload: API.getRequest('nfts/nfts_sell_requests'),
  }),
  approveSellNft: (fingerprint: string): ReduxAction => ({
    type: types.NFT_APPROVE_SELL_NFT,
    payload: API.putRequest(`nfts/${fingerprint}/accept_sell`),
  }),
  declineSellNft: (fingerprint: string): ReduxAction => ({
    type: types.NFT_DECLINE_SELL_NFT,
    payload: API.putRequest(`nfts/${fingerprint}/reject_sell`),
  }),
};

// eslint-disable-next-line default-param-last
export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.NFT_FETCH_SELL_NFTS_FULFILLED:
      return { ...state, ...keyBy(action.payload, 'fingerprint') };

    case types.NFT_APPROVE_SELL_NFT_FULFILLED:
      toast.success('NFT approved for selling.');

      return { ...omit({ ...state }, action.payload.fingerprint) };

    case types.NFT_DECLINE_SELL_NFT_FULFILLED:
      toast.success('NFT approved for selling.');

      return { ...omit({ ...state }, action.payload.fingerprint) };

    default:
      return state || {};
  }
};
