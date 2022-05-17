// @flow
import {
  keyBy, values, get, omit, includes,
} from 'lodash';
import { toast } from 'react-toastify';
import * as API from '../api';
import { removeItem } from '../localStorage';
import { types as nftTypes } from './nftStore';
import type { QueryParam } from '../api';
import type { ReduxAction, ReduxActionWithPayload, ReduxState } from '../types';
import type { Nft } from './nftStore';
import { getAllUserWalletAddresses } from '../utils';

export type CardanoAddresses = {
  id: number,
  address: string,
  dirty: boolean,
  wallet_id: number,
  created_at: string,
  updated_at: string,
}

export type Wallet = {
  id: number,
  total: number,
  used: number,
  cardano_addresses: CardanoAddresses[],
}

export type Profile = {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  full_name: string,
  orcid_id: string,
  study_field: string,
  profile_img: string,
  social_links: string[],
  created_at: string,
  updated_at: string,
  wallets: Wallet[],
}

type LoginCredentials = {
  email: string,
  password: string,
}

type RegisterCredentials = {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  study_field_id?: string,
  orcid_id?: string,
}

type CredentialsORCID = {
  code: string,
  redirect_uri: string,
}

type UpdatePayload = {
  userId: number,
  user: {
    first_name?: string,
    last_name?: string,
    study_field_id?: string,
    orcid_id?: string,
  }
}

export type State = {
  profile: Profile,
  orcidAccount: Object,
  userNfts: { [string]: Nft },
};

export const types = {
  USR_LOGIN_USER: 'USR/LOGIN_USER',
  USR_LOGIN_USER_PENDING: 'USR/LOGIN_USER_PENDING',
  USR_LOGIN_USER_REJECTED: 'USR/LOGIN_USER_REJECTED',
  USR_LOGIN_USER_FULFILLED: 'USR/LOGIN_USER_FULFILLED',

  USR_LOGIN_USER_ORCID: 'USR/LOGIN_USER_ORCID',
  USR_LOGIN_USER_ORCID_PENDING: 'USR/LOGIN_USER_ORCID_PENDING',
  USR_LOGIN_USER_ORCID_REJECTED: 'USR/LOGIN_USER_ORCID_REJECTED',
  USR_LOGIN_USER_ORCID_FULFILLED: 'USR/LOGIN_USER_ORCID_FULFILLED',

  USR_LOGOUT_USER: 'USR/LOGOUT_USER',
  USR_LOGOUT_USER_PENDING: 'USR/LOGOUT_USER_PENDING',
  USR_LOGOUT_USER_REJECTED: 'USR/LOGOUT_USER_REJECTED',
  USR_LOGOUT_USER_FULFILLED: 'USR/LOGOUT_USER_FULFILLED',

  USR_REGISTER_USER: 'USR/REGISTER_USER',
  USR_REGISTER_USER_PENDING: 'USR/REGISTER_USER_PENDING',
  USR_REGISTER_USER_REJECTED: 'USR/REGISTER_USER_REJECTED',
  USR_REGISTER_USER_FULFILLED: 'USR/REGISTER_USER_FULFILLED',

  USR_CONNECT_ORCID: 'USR/CONNECT_ORCID',
  USR_CONNECT_ORCID_PENDING: 'USR/CONNECT_ORCID_PENDING',
  USR_CONNECT_ORCID_REJECTED: 'USR/CONNECT_ORCID_REJECTED',
  USR_CONNECT_ORCID_FULFILLED: 'USR/CONNECT_ORCID_FULFILLED',

  USR_UPDATE_USER: 'USR/UPDATE_USER',
  USR_UPDATE_USER_PENDING: 'USR/UPDATE_USER_PENDING',
  USR_UPDATE_USER_REJECTED: 'USR/UPDATE_USER_REJECTED',
  USR_UPDATE_USER_FULFILLED: 'USR/UPDATE_USER_FULFILLED',

  USR_CLEAR_USER: 'USR/CLEAR_USER',

  USR_VALIDATE_USER: 'USR/VALIDATE_USER',
  USR_VALIDATE_USER_PENDING: 'USR/VALIDATE_USER_PENDING',
  USR_VALIDATE_USER_REJECTED: 'USR/VALIDATE_USER_REJECTED',
  USR_VALIDATE_USER_FULFILLED: 'USR/VALIDATE_USER_FULFILLED',

  USR_FETCH_NFTS: 'USR/FETCH_NFTS',
  USR_FETCH_NFTS_PENDING: 'USR/FETCH_NFTS_PENDING',
  USR_FETCH_NFTS_REJECTED: 'USR/FETCH_NFTS_REJECTED',
  USR_FETCH_NFTS_FULFILLED: 'USR/FETCH_NFTS_FULFILLED',
};

export const selectors = {
  getUser: (state: ReduxState): Profile => state.user.profile,
  getOrcid: (state: ReduxState): Profile => state.user.orcidAccount,
  getUserNfts: (state: ReduxState): Nft[] => values(state.user.userNfts),
};

export const actions = {
  loginUser: (payload: LoginCredentials): ReduxAction => ({
    type: types.USR_LOGIN_USER,
    payload: API.postRequest('auth/session', { user: payload }),
  }),
  loginUserORCID: (payload: CredentialsORCID): ReduxAction => ({
    type: types.USR_LOGIN_USER_ORCID,
    payload: API.orcidOAuth('auth/session/orcid', { orcid: payload }),
  }),
  logoutUser: (): ReduxAction => ({
    type: types.USR_LOGOUT_USER,
    payload: API.deleteRequest('auth/session'),
  }),
  registerUser: (payload: RegisterCredentials): ReduxAction => ({
    type: types.USR_REGISTER_USER,
    payload: API.postRequest('auth/user', { user: payload }),
  }),
  registerUserORCID: (payload: CredentialsORCID): ReduxAction => ({
    type: types.USR_CONNECT_ORCID,
    payload: API.orcidOAuth('auth/user/orcid', { orcid: payload }),
  }),
  updateUser: (payload: UpdatePayload): ReduxAction => ({
    type: types.USR_UPDATE_USER,
    payload: API.putRequest(`users/${payload.userId}`, { user: payload.user }),
  }),
  clearUser: (): ReduxAction => ({
    type: types.USR_CLEAR_USER,
  }),
  validateUser: (jwt: string): ReduxAction => ({
    type: types.USR_VALIDATE_USER,
    payload: API.postRequest('auth/validate_jwt', { jwt }),
  }),
  fetchUserNfts: (endpoint: string, params: QueryParam[]|string[]): ReduxAction => ({
    type: types.USR_FETCH_NFTS,
    payload: API.getRequest(endpoint, params),
  }),
};

const logoutUser = (): State => {
  removeItem('_jwt');
  removeItem('user');

  return {};
};

const handleLikeResponse = (state: State, payload: Object): State => ({ ...state, userNfts: { ...state.userNfts, [payload.fingerprint]: payload } });

const handleDislikeResponse = (state: State, payload: Object): State => {
  const nft: ?Nft = get(state, `userNfts.${payload.fingerprint}`);
  if (!nft) return state;

  const isOwner = get(nft.owner.id) === get(state.profile.id);
  const isAuthor = includes(getAllUserWalletAddresses(state.profile.wallets, 'address'), nft.cardano_address);

  if (isAuthor || isOwner) return { ...state, userNfts: { ...state.userNfts, [payload.fingerprint]: payload } };

  return { ...state, userNfts: omit(state.userNfts, payload.fingerprint) };
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.USR_LOGIN_USER_FULFILLED:
    case types.USR_LOGIN_USER_ORCID_FULFILLED:
      toast.success('User successfully logged in!');

      return { ...state, ...{ profile: action.payload } };

    case types.USR_CONNECT_ORCID_FULFILLED:
      toast.success('Thank you for connecting your ORCID iD!');

      return { ...state, ...{ orcidAccount: action.payload } };

    case types.USR_REGISTER_USER_FULFILLED:
      toast.success('User registered, a confirmation email has been sent!');

      return state;

    case types.USR_UPDATE_USER_FULFILLED:
      toast.success('User successfully updated!');

      return { ...state, ...{ profile: action.payload } };

    case types.USR_LOGOUT_USER_FULFILLED:
      toast.success('User successfully logged out!');

      return logoutUser();

    case types.USR_CLEAR_USER:
      return logoutUser();

    case types.USR_FETCH_NFTS_FULFILLED:
      return { ...state, ...{ userNfts: { ...state.userNfts, ...keyBy(action.payload, 'fingerprint') } } };

    case nftTypes.NFT_LIKE_NFT_FULFILLED:
      return handleLikeResponse(state, action.payload);
    case nftTypes.NFT_DISLIKE_NFT_FULFILLED:
      return handleDislikeResponse(state, action.payload);

    default:
      return state || {};
  }
};
