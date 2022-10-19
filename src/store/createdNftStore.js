// @flow
import {
  values, keyBy, get,
} from 'lodash';
import { toast } from 'react-toastify';
import * as API from '../api';
import type { ReduxActionWithPayload, ReduxAction, ReduxState } from '../types';
import type { Nft } from './nftStore';


export type State = {
  [string]: Nft,
};

export const types = {
  NFT_FETCH_CREATED_NFTS: 'NFT/FETCH_CREATED_NFTS',
  NFT_FETCH_CREATED_NFTS_PENDING: 'NFT/FETCH_CREATED_NFTS_PENDING',
  NFT_FETCH_CREATED_NFTS_REJECTED: 'NFT/FETCH_CREATED_NFTS_REJECTED',
  NFT_FETCH_CREATED_NFTS_FULFILLED: 'NFT/FETCH_CREATED_NFTS_FULFILLED',

  NFT_APPROVE_CREATED_NFT: 'NFT/APPROVE_CREATED_NFT',
  NFT_APPROVE_CREATED_NFT_PENDING: 'NFT/APPROVE_CREATED_NFT_PENDING',
  NFT_APPROVE_CREATED_NFT_REJECTED: 'NFT/APPROVE_CREATED_NFT_REJECTED',
  NFT_APPROVE_CREATED_NFT_FULFILLED: 'NFT/APPROVE_CREATED_NFT_FULFILLED',

  NFT_DECLINE_CREATED_NFT: 'NFT/DECLINE_CREATED_NFT',
  NFT_DECLINE_CREATED_NFT_PENDING: 'NFT/DECLINE_CREATED_NFT_PENDING',
  NFT_DECLINE_CREATED_NFT_REJECTED: 'NFT/DECLINE_CREATED_NFT_REJECTED',
  NFT_DECLINE_CREATED_NFT_FULFILLED: 'NFT/DECLINE_CREATED_NFT_FULFILLED',
};

export const selectors = {
  getCreatedNfts: (state: ReduxState): Nft[] => values(state.createdNfts),
};

export const actions = {
  fetchCreatedNfts: (): ReduxAction => ({
    type: types.NFT_FETCH_CREATED_NFTS,
    payload: API.getRequest('created_nfts'),
  }),
  approveCreatedNft: (fingerprint: string): ReduxAction => ({
    type: types.NFT_APPROVE_CREATED_NFT,
    payload: API.postRequest(`created_nfts/approve?id=${fingerprint}`),
  }),
  declineCreatedNft: (fingerprint: string): ReduxAction => ({
    type: types.NFT_DECLINE_CREATED_NFT,
    payload: API.deleteRequest(`created_nfts/decline?id=${fingerprint}`),
  }),
};

const handleDeclineResponse = (state: State): State => {
  const nfts: ?Nft[] = get(state);
  if (!nfts) return state;

  return { ...state };
};

// eslint-disable-next-line default-param-last
export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.NFT_FETCH_CREATED_NFTS_FULFILLED:
      return { ...state, ...keyBy(action.payload, 'fingerprint') }

    case types.NFT_APPROVE_CREATED_NFT_FULFILLED:
      return toast.success('NFT approved for minting.');
    case types.NFT_DECLINE_CREATED_NFT_FULFILLED:
      // TODO: find out why this is returning an error
      // state should be updated
      return handleDeclineResponse(state);
      //return toast.success('NFT minting successfully declined.');

    default:
      return state || {};
  }
};
