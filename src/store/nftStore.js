// @flow
import {
  values, keyBy, get, filter
} from 'lodash';
import * as API from '../api';
import { jsonToFormData } from '../utils';
import type { ReduxActionWithPayload, ReduxAction, ReduxState } from '../types';

export type CreatePayload = {
  fingerprint: string,
  tradeable: boolean,
  name: string,
  description: string,
  owner_id: number,
  category_id: ?number,
  policy_id: string,
  file: string,
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
  tags: string[]|null,
  likes: NftLike[],
  endorsers: string[]|null,
  owner: Object,
  verified: boolean,
  url: string,
  state: string,
  nft_id: number,
  seller_address: string,
}

export type State = {
  [string]: Nft,
};

export const types = {
  NFT_FETCH_NFTS: 'NFT/FETCH_NFTS',
  NFT_FETCH_NFTS_PENDING: 'NFT/FETCH_NFTS_PENDING',
  NFT_FETCH_NFTS_REJECTED: 'NFT/FETCH_NFTS_REJECTED',
  NFT_FETCH_NFTS_FULFILLED: 'NFT/FETCH_NFTS_FULFILLED',

  NFT_FETCH_NFTS_ON_SALE: 'NFT/FETCH_NFTS_ON_SALE',
  NFT_FETCH_NFTS_ON_SALE_PENDING: 'NFT/FETCH_NFTS_ON_SALE_PENDING',
  NFT_FETCH_NFTS_ON_SALE_REJECTED: 'NFT/FETCH_NFTS_ON_SALE_REJECTED',
  NFT_FETCH_NFTS_ON_SALE_FULFILLED: 'NFT/FETCH_NFTS_ON_SALE_FULFILLED',

  NFT_CREATE_NFT: 'NFT/CREATE_NFT',
  NFT_CREATE_NFT_PENDING: 'NFT/CREATE_NFT_PENDING',
  NFT_CREATE_NFT_REJECTED: 'NFT/CREATE_NFT_REJECTED',
  NFT_CREATE_NFT_FULFILLED: 'NFT/CREATE_NFT_FULFILLED',

  NFT_UPDATE_TX_AND_WITNESS_NFT: 'NFT/UPDATE_TX_AND_WITNESS_NFT',
  NFT_UPDATE_TX_AND_WITNESS_NFT_PENDING: 'NFT/UPDATE_TX_AND_WITNESS_NFT_PENDING',
  NFT_UPDATE_TX_AND_WITNESS_NFT_REJECTED: 'NFT/UPDATE_TX_AND_WITNESS_NFT_REJECTED',
  NFT_UPDATE_TX_AND_WITNESS_NFT_FULFILLED: 'NFT/UPDATE_TX_AND_WITNESS_NFT_FULFILLED',

  NFT_UPDATE_SELLER_AND_PRICE: 'NFT/UPDATE_SELLER_AND_PRICE',
  NFT_UPDATE_SELLER_AND_PRICE_PENDING: 'NFT/UPDATE_SELLER_AND_PRICE_PENDING',
  NFT_UPDATE_SELLER_AND_PRICE_REJECTED: 'NFT/UPDATE_SELLER_AND_PRICE_REJECTED',
  NFT_UPDATE_SELLER_AND_PRICE_FULFILLED: 'NFT/UPDATE_SELLER_AND_PRICE_FULFILLED',

  NFT_UPDATE_STATE_TO_ON_SALE: 'NFT/UPDATE_STATE_TO_ON_SALE',
  NFT_UPDATE_STATE_TO_ON_SALE_PENDING: 'NFT/UPDATE_STATE_TO_ON_SALE_PENDING',
  NFT_UPDATE_STATE_TO_ON_SALE_REJECTED: 'NFT/UPDATE_STATE_TO_ON_SALE_REJECTED',
  NFT_UPDATE_STATE_TO_ON_SALE_FULFILLED: 'NFT/UPDATE_STATE_TO_ON_SALE_FULFILLED',

  NFT_LIKE_NFT: 'NFT/LIKE_NFT',
  NFT_LIKE_NFT_PENDING: 'NFT/LIKE_NFT_PENDING',
  NFT_LIKE_NFT_REJECTED: 'NFT/LIKE_NFT_REJECTED',
  NFT_LIKE_NFT_FULFILLED: 'NFT/LIKE_NFT_FULFILLED',

  NFT_DISLIKE_NFT: 'NFT/DISLIKE_NFT',
  NFT_DISLIKE_NFT_PENDING: 'NFT/DISLIKE_NFT_PENDING',
  NFT_DISLIKE_NFT_REJECTED: 'NFT/DISLIKE_NFT_REJECTED',
  NFT_DISLIKE_NFT_FULFILLED: 'NFT/DISLIKE_NFT_FULFILLED',
};

export const selectors = {
  getNfts: (state: ReduxState): Nft[] => values(state.nfts),
  getNftsOnSale: (state: ReduxState): Nft[] => values(filter(state.nfts, (nft: Nft) => {

    if(nft.state === 'on_sale') {
      return true
    };

    return false;
  })),
};

export const actions = {
  fetchNfts: (): ReduxAction => ({
    type: types.NFT_FETCH_NFTS,
    payload: API.getRequest('intellart/nfts'),
  }),
  fetchNftsOnSale: (): ReduxAction => ({
    type: types.NFT_FETCH_NFTS_ON_SALE,
    payload: API.getRequest('intellart/nfts/index_on_sale'),
  }),
  createNft: (payload: CreatePayload): ReduxAction => ({
    type: types.NFT_CREATE_NFT,
    payload: API.postRequest('intellart/nfts', jsonToFormData('nft', payload)),
  }),
  updateTxAndWitness: (payload: any, fingerprint: string): ReduxAction => ({
    type: types.NFT_UPDATE_TX_AND_WITNESS_NFT,
    payload: API.putRequest(`intellart/nfts/${fingerprint}/update_tx_and_witness`, jsonToFormData('nft', payload)),
  }),
  updateSeller: (payload: any, fingerprint: string): ReduxAction => ({
    type: types.NFT_UPDATE_SELLER_AND_PRICE,
    payload: API.putRequest(`intellart/nfts/${fingerprint}/update_seller`, jsonToFormData('nft', payload)),
  }),
  updateStateToOnSale: (fingerprint: string): ReduxAction => ({
    type: types.NFT_UPDATE_STATE_TO_ON_SALE,
    payload: API.putRequest(`intellart/nfts/${fingerprint}/initiate_sale`),
  }),
  likeNft: (payload: LikePayload): ReduxAction => ({
    type: types.NFT_LIKE_NFT,
    payload: API.postRequest('intellart/nft_likes', { like: payload }),
  }),
  dislikeNft: (id: number): ReduxAction => ({
    type: types.NFT_DISLIKE_NFT,
    payload: API.deleteRequest(`intellart/nft_likes/${id}`),
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

    case types.NFT_FETCH_NFTS_ON_SALE_FULFILLED:
      return { ...state, ...keyBy(action.payload, 'fingerprint') };

    case types.NFT_CREATE_NFT_FULFILLED:
      return { ...state, ...keyBy([action.payload], 'fingerprint') };

    case types.NFT_UPDATE_TX_AND_WITNESS_NFT_FULFILLED:
      return { ...state, ...keyBy([action.payload], 'fingerprint') };

    case types.NFT_UPDATE_SELLER_AND_PRICE_FULFILLED:
      return { ...state, ...keyBy([action.payload], 'fingerprint') };

    case types.NFT_UPDATE_STATE_TO_ON_SALE_FULFILLED:
      return { ...state, ...keyBy([action.payload], 'fingerprint') };

    case types.NFT_LIKE_NFT_FULFILLED:
      return handleLikeResponse(state, action.payload);
    case types.NFT_DISLIKE_NFT_FULFILLED:
      return handleDislikeResponse(state, action.payload);

    default:
      return state || {};
  }
};
