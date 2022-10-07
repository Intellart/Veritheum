// @flow
import {
  values, keyBy, get,
} from 'lodash';
import { toast } from 'react-toastify';
import * as API from '../api';
import type { ReduxActionWithPayload, ReduxAction, ReduxState } from '../types';

export type CreatePayload = {
  fingerprint: string,
  tradeable: boolean,
  price: ?string|number,
  name: string,
  description: string,
  subject: string,
  owner_id: number,
  nft_collection_id?: number,
  category_id: ?number,
  asset_name: string,
  policy_id: string,
  onchain_transaction_id: number,
  cardano_address_id: number,
  url: string
}

export type LikePayload = {
  fingerprint: string,
  user_id: number,
}

export type NftLike = {
  id: number,
  user_id:number,
  fingerprint:string,
}

export type Nft = {
  fingerprint: string,
  tradeable: boolean,
  price: ?string|number,
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
  likes: NftLike[],
  endorsers: string[]|null,
  owner: Object,
  verified: boolean,
  file: string,
  status: string,
}

export type State = {
  [string]: Nft,
  createdNfts: Nft[],
  sellNfts: Nft[],
};

export const types = {
  NFT_FETCH_NFTS: 'NFT/FETCH_NFTS',
  NFT_FETCH_NFTS_PENDING: 'NFT/FETCH_NFTS_PENDING',
  NFT_FETCH_NFTS_REJECTED: 'NFT/FETCH_NFTS_REJECTED',
  NFT_FETCH_NFTS_FULFILLED: 'NFT/FETCH_NFTS_FULFILLED',

  NFT_CREATE_NFT: 'NFT/CREATE_NFT',
  NFT_CREATE_NFT_PENDING: 'NFT/CREATE_NFT_PENDING',
  NFT_CREATE_NFT_REJECTED: 'NFT/CREATE_NFT_REJECTED',
  NFT_CREATE_NFT_FULFILLED: 'NFT/CREATE_NFT_FULFILLED',

  NFT_LIKE_NFT: 'NFT/LIKE_NFT',
  NFT_LIKE_NFT_PENDING: 'NFT/LIKE_NFT_PENDING',
  NFT_LIKE_NFT_REJECTED: 'NFT/LIKE_NFT_REJECTED',
  NFT_LIKE_NFT_FULFILLED: 'NFT/LIKE_NFT_FULFILLED',

  NFT_DISLIKE_NFT: 'NFT/DISLIKE_NFT',
  NFT_DISLIKE_NFT_PENDING: 'NFT/DISLIKE_NFT_PENDING',
  NFT_DISLIKE_NFT_REJECTED: 'NFT/DISLIKE_NFT_REJECTED',
  NFT_DISLIKE_NFT_FULFILLED: 'NFT/DISLIKE_NFT_FULFILLED',

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
  getNfts: (state: ReduxState): Nft[] => values(state.nfts),
  getCreatedNfts: (state: ReduxState): Nft[] => values(state.createdNfts),
  getSellNfts: (state: ReduxState): Nft[] => values(state.sellNfts),
};

export const actions = {
  fetchNfts: (): ReduxAction => ({
    type: types.NFT_FETCH_NFTS,
    payload: API.getRequest('nfts'),
  }),
  createNft: (payload: CreatePayload): ReduxAction => ({
    type: types.NFT_CREATE_NFT,
    payload: API.postRequest('nfts', { nft: payload }),
  }),
  likeNft: (payload: LikePayload): ReduxAction => ({
    type: types.NFT_LIKE_NFT,
    payload: API.postRequest('nft_likes', { like: payload }),
  }),
  dislikeNft: (id: number): ReduxAction => ({
    type: types.NFT_DISLIKE_NFT,
    payload: API.deleteRequest(`nft_likes/${id}`),
  }),
  fetchCreatedNfts: (): ReduxAction => ({
    type: types.NFT_FETCH_CREATED_NFTS,
    payload: API.getRequest('created_nfts'),
  }),
  approveCreatedNft: (fingerprint: string): ReduxAction => ({
    type: types.NFT_APPROVE_CREATED_NFT,
    payload: API.postRequest(`created_nfts/${fingerprint}`),
  }),
  declineCreatedNft: (fingerprint: string): ReduxAction => ({
    type: types.NFT_DECLINE_CREATED_NFT,
    payload: API.deleteRequest(`created_nfts/${fingerprint}`),
  }),
  fetchSellNfts: (): ReduxAction => ({
    type: types.NFT_FETCH_SELL_NFTS,
    payload: API.getRequest('sell_nfts'),
  }),
  approveSellNft: (fingerprint: string): ReduxAction => ({
    type: types.NFT_APPROVE_SELL_NFT,
    payload: API.postRequest(`sell_nfts/${fingerprint}`),
  }),
  declineSellNft: (fingerprint: string): ReduxAction => ({
    type: types.NFT_DECLINE_SELL_NFT,
    payload: API.deleteRequest(`sell_nfts/${fingerprint}`),
  }),
};

const handleLikeResponse = (state: State, payload: Object): State => {
  const nft: ?Nft = get(state, payload.fingerprint);
  if (!nft) return state;

  return { ...state, [payload.fingerprint]: payload };
};

const handleDislikeResponse = (state: State, payload: Object): State => {
  const nft: ?Nft = get(state, payload.fingerprint);
  if (!nft) return state;

  return { ...state, [payload.fingerprint]: payload };
};

// eslint-disable-next-line default-param-last
export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.NFT_FETCH_NFTS_FULFILLED:
      return { ...state, ...keyBy(action.payload, 'fingerprint') };

    case types.NFT_CREATE_NFT_FULFILLED:
      return { ...state, ...keyBy([action.payload], 'fingerprint') };

    case types.NFT_LIKE_NFT_FULFILLED:
      return handleLikeResponse(state, action.payload);
    case types.NFT_DISLIKE_NFT_FULFILLED:
      return handleDislikeResponse(state, action.payload);

    case types.NFT_FETCH_CREATED_NFTS_FULFILLED:
    case types.NFT_FETCH_SELL_NFTS_FULFILLED:
      return { ...state, ...keyBy(action.payload, 'fingerprint') }

    case types.NFT_APPROVE_CREATED_NFT_FULFILLED:
      return toast.success('NFT approved for minting.');
    case types.NFT_APPROVE_SELL_NFT_FULFILLED:
      return toast.success('NFT approved for selling.');

    case types.NFT_DECLINE_CREATED_NFT_FULFILLED:
      return toast.success('NFT minting successfully declined.');
    case types.NFT_DECLINE_SELL_NFT_FULFILLED:
      return toast.success('Sale of NFT successfully declined.');

    default:
      return state || {};
  }
};
