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

// export type CardanoAddresses = {
//   id: number,
//   address: string,
//   dirty: boolean,
//   wallet_id: number,
//   created_at: string,
//   updated_at: string,
// }

// export type Wallet = {
//   id: number,
//   total: number,
//   used: number,
//   cardano_addresses: CardanoAddresses[],
// }

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
}

type Admin = {
  id: number,
  email: string,
  role: number,
  created_at: string,
  updated_at: string,
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
  profile: Profile|null,
  orcidAccount: Object,
  userNfts: { [string]: Nft },
  currentSelectedUser: Profile|null,
  currentSelectedUserNfts: { [string]: Nft }|null,
  currentAdmin: Admin|null,
  allUsers: { [string]: Profile },
};

export const types = {
  USR_LOGIN_ADMIN: 'USR/LOGIN_ADMIN',
  USR_LOGIN_ADMIN_PENDING: 'USR/LOGIN_ADMIN_PENDING',
  USR_LOGIN_ADMIN_REJECTED: 'USR/LOGIN_ADMIN_REJECTED',
  USR_LOGIN_ADMIN_FULFILLED: 'USR/LOGIN_ADMIN_FULFILLED',

  USR_LOGOUT_ADMIN: 'USR/LOGOUT_ADMIN',
  USR_LOGOUT_ADMIN_PENDING: 'USR/LOGOUT_ADMIN_PENDING',
  USR_LOGOUT_ADMIN_REJECTED: 'USR/LOGOUT_ADMIN_REJECTED',
  USR_LOGOUT_ADMIN_FULFILLED: 'USR/LOGOUT_ADMIN_FULFILLED',

  USR_CLEAR_ADMIN: 'USR/CLEAR_ADMIN',
  USR_CLEAR_CURRENT_ADMIN: 'USR/CLEAR_CURRENT_ADMIN',

  USR_FETCH_ALL_USERS: 'USR/FETCH_ALL_USERS',
  USR_FETCH_ALL_USERS_PENDING: 'USR/FETCH_ALL_USERS_PENDING',
  USR_FETCH_ALL_USERS_REJECTED: 'USR/FETCH_ALL_USERS_REJECTED',
  USR_FETCH_ALL_USERS_FULFILLED: 'USR/FETCH_ALL_USERS_FULFILLED',

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
  USR_CLEAR_CURRENT_SELECTED_USER: 'USR/CLEAR_CURRENT_SELECTED_USER',

  USR_VALIDATE_USER: 'USR/VALIDATE_USER',
  USR_VALIDATE_USER_PENDING: 'USR/VALIDATE_USER_PENDING',
  USR_VALIDATE_USER_REJECTED: 'USR/VALIDATE_USER_REJECTED',
  USR_VALIDATE_USER_FULFILLED: 'USR/VALIDATE_USER_FULFILLED',

  USR_FETCH_NFTS: 'USR/FETCH_NFTS',
  USR_FETCH_NFTS_PENDING: 'USR/FETCH_NFTS_PENDING',
  USR_FETCH_NFTS_REJECTED: 'USR/FETCH_NFTS_REJECTED',
  USR_FETCH_NFTS_FULFILLED: 'USR/FETCH_NFTS_FULFILLED',

  USR_FETCH_USER_BY_ID: 'USR/FETCH_USER_BY_ID',
  USR_FETCH_USER_BY_ID_PENDING: 'USR/FETCH_USER_BY_ID_PENDING',
  USR_FETCH_USER_BY_ID_REJECTED: 'USR/FETCH_USER_BY_ID_REJECTED',
  USR_FETCH_USER_BY_ID_FULFILLED: 'USR/FETCH_USER_BY_ID_FULFILLED',
};

export const selectors = {
  getAdmin: (state: ReduxState): Admin|null => state.user.currentAdmin,
  getUser: (state: ReduxState, isCurrentSelectedUser?: boolean): Profile|null => (isCurrentSelectedUser ? state.user.currentSelectedUser : state.user.profile),
  getOrcid: (state: ReduxState): Profile => state.user.orcidAccount,
  getUserNfts: (state: ReduxState, isCurrentSelectedUser?: boolean): Nft[] =>  {
    const list = values(isCurrentSelectedUser ? state.user.currentSelectedUserNfts : state.user.userNfts);
    return list
  },
  getAllUsers: (state: ReduxState): Profile[] => values(state.user.allUsers),
};

export const actions = {
  loginAdmin: (payload: LoginCredentials): ReduxAction => ({
    type: types.USR_LOGIN_ADMIN,
    payload: API.postRequest('admin/session', { admin: payload }),
  }),
  logoutAdmin: (): ReduxAction => ({
    type: types.USR_LOGOUT_ADMIN,
    payload: API.deleteRequest('admin/session'),
  }),
  clearAdmin: (): ReduxAction => ({
    type: types.USR_CLEAR_ADMIN,
  }),
  clearCurrentAdmin: (): ReduxAction => ({
    type: types.USR_CLEAR_CURRENT_ADMIN,
  }),
  fetchAllUsers: (): ReduxAction => ({
    type: types.USR_FETCH_ALL_USERS,
    payload: API.getRequest('intellart/users'),
  }),
  loginUser: (payload: LoginCredentials): ReduxAction => ({
    type: types.USR_LOGIN_USER,
    payload: API.postRequest('auth/session', { user: payload }),
  }),
  loginUserORCID: (payload: CredentialsORCID): ReduxAction => ({
    type: types.USR_LOGIN_USER_ORCID,
    payload: API.orcidOAuth('auth/orcid/session', { orcid: payload }),
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
    payload: API.orcidOAuth('auth/orcid/user', { orcid: payload }),
  }),
  updateUser: (payload: UpdatePayload): ReduxAction => ({
    type: types.USR_UPDATE_USER,
    payload: API.putRequest(`intellart/users/${payload.userId}`, { user: payload.user }),
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
  fetchUserById: (userId: string|number): ReduxAction => ({
    type: types.USR_FETCH_USER_BY_ID,
    payload: API.getRequest('intellart/users/' + userId),
  }),
  clearCurrentSelectedUser: (): ReduxAction => ({
    type: types.USR_CLEAR_CURRENT_SELECTED_USER,
  }),
};

const logoutUser = (): State => {
  removeItem('_jwt');
  removeItem('user');

  return {};
};

const logoutAdmin = (): State => {
  removeItem('_jwt');
  removeItem('admin');

  return {};
};

const handleLikeResponse = (state: State, payload: Object): State => ({ ...state, userNfts: { ...state.userNfts, [payload.fingerprint]: payload } });

const handleDislikeResponse = (state: State, payload: Object): State => {
  const nft: ?Nft = get(state, `userNfts.${payload.fingerprint}`);
  if (!nft) return state;

  // $FlowFixMe
  const isOwner = get(nft.owner.id) === get(state.profile.id);

  if (isOwner) return { ...state, userNfts: { ...state.userNfts, [payload.fingerprint]: payload } };

  return { ...state, userNfts: omit(state.userNfts, payload.fingerprint) };
};

const handleUserNfts = (state: State, payload: Nft[]): State => {
  const userId = window.location.pathname.replace('/profile/', '');
  const saveToState: string = userId === '/profile' ? 'userNfts' : 'currentSelectedUserNfts';

  return { ...state, ...{ [saveToState]: { ...state[saveToState], ...keyBy(payload, 'fingerprint') } } };
};

const handleSilentLogin = (state: State, payload: {user: Profile|Admin, is_admin: boolean}): State => {
  if (payload.is_admin) {
    // $FlowFixMe
    return { ...state, currentAdmin: payload.user };
  }

  // $FlowFixMe
  return { ...state, profile: payload.user };
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.USR_VALIDATE_USER_FULFILLED:
      return handleSilentLogin(state, action.payload);

    case types.USR_LOGIN_ADMIN_FULFILLED:
      toast.success('Admin successfully logged in!');

      return { ...state, ...{ currentAdmin: action.payload, profile: null } };

    case types.USR_LOGOUT_ADMIN_FULFILLED:
      toast.success('Admin successfully logged out!');

      return logoutAdmin();

    case types.USR_CLEAR_ADMIN:
      return logoutAdmin();

    case types.USR_CLEAR_CURRENT_ADMIN:
      return { ...state, currentAdmin: null };

    case types.USR_FETCH_ALL_USERS_FULFILLED:
      return { ...state, ...{ allUsers: { ...state.allUsers, ...keyBy(action.payload, 'id') } } };

    case types.USR_LOGIN_USER_FULFILLED:
    case types.USR_LOGIN_USER_ORCID_FULFILLED:
      toast.success('User successfully logged in!');

      return { ...state, ...{ profile: action.payload, currentAdmin: null } };

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

    case types.USR_CLEAR_CURRENT_SELECTED_USER:
      return { ...state, currentSelectedUser: null, currentSelectedUserNfts: null };

    case types.USR_FETCH_USER_BY_ID_FULFILLED:
      return { ...state, currentSelectedUser: action.payload };

    case types.USR_FETCH_NFTS_FULFILLED:
      return handleUserNfts(state, action.payload);

    case nftTypes.NFT_CREATE_NFT_FULFILLED:
      return { ...state, ...{ userNfts: { ...state.userNfts, ...keyBy([action.payload], 'fingerprint') } } };

    case nftTypes.NFT_LIKE_NFT_FULFILLED:
      return handleLikeResponse(state, action.payload);
    case nftTypes.NFT_DISLIKE_NFT_FULFILLED:
      return handleDislikeResponse(state, action.payload);

    default:
      return state || {};
  }
};
