// @flow
import * as API from '../api';
import type { ReduxActionWithPayload, ReduxAction, ReduxState } from '../types';

type Nft = {
  fingerprint: string,
  tradeable: boolean,
  price: string,
  name: string,
  description: string|null,
  subject: string,
  nft_collection: string|null,
  category: string,
  asset_name: string,
  policy_id: string,
  onchain_transaction: Object,
  cardano_address: string,
  tags: string[]|null,
  likes: string[]|null,
  endorsers: string[]|null,
  owner: Object,
}

export type State = Nft[];

export const types = {
  NFT_FETCH_NFTS: 'NFT/FETCH_NFTS',
  NFT_FETCH_NFTS_PENDING: 'NFT/FETCH_NFTS_PENDING',
  NFT_FETCH_NFTS_REJECTED: 'NFT/FETCH_NFTS_REJECTED',
  NFT_FETCH_NFTS_FULFILLED: 'NFT/FETCH_NFTS_FULFILLED',

  NFT_CREATE_NFT: 'NFT/CREATE_NFT',
  NFT_CREATE_NFT_PENDING: 'NFT/CREATE_NFT_PENDING',
  NFT_CREATE_NFT_REJECTED: 'NFT/CREATE_NFT_REJECTED',
  NFT_CREATE_NFT_FULFILLED: 'NFT/CREATE_NFT_FULFILLED',
};

export const selectors = {
  getNfts: (state: ReduxState): State => state.nfts,
};

export const actions = {
  fetchNfts: (): ReduxAction => ({
    type: types.NFT_FETCH_NFTS,
    payload: API.getRequest('nfts').then((response) => response),
  }),
  createNft: (payload): ReduxAction => ({
    type: types.NFT_CREATE_NFT,
    payload: API.postRequest('nfts', { nft: payload }),
  }),
};

// eslint-disable-next-line default-param-last
export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.NFT_FETCH_NFTS_FULFILLED:
      return action.payload;

    case types.NFT_CREATE_NFT_FULFILLED:
      return state;

    default:
      return state || {};
  }
};
