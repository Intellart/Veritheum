// @flow
import { toast } from 'react-toastify';
import * as API from '../api';
import { removeItem } from '../localStorage';
import type { ReduxAction, ReduxActionWithPayload, ReduxState } from '../types';

export type Profile = {
  id: string,
  email: string,
  first_name: string,
  last_name: string,
  full_name: string,
  updated_at: Date,
  created_at: Date,
  confirmed_at: Date,
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
    orcid_id?: string,
  }
}

export type State = {
  profile: Profile,
  orcidAccount: Object,
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
};

export const selectors = {
  getUser: (state: ReduxState): Profile => state.user.profile,
  getOrcid: (state: ReduxState): Profile => state.user.orcidAccount,
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
  updateUser: (payload: UpdatePayload&Profile): ReduxAction => ({
    type: types.USR_UPDATE_USER,
    payload: API.putRequest(`users/${payload.id}`, { user: payload }),
  }),
  clearUser: (): ReduxAction => ({
    type: types.USR_CLEAR_USER,
  }),
};

const logoutUser = (): State => {
  removeItem('_jwt');
  removeItem('user');

  return {};
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.USR_LOGIN_USER_FULFILLED:
    case types.USR_LOGIN_USER_ORCID_FULFILLED:
      return { ...state, ...{ profile: action.payload } };

    case types.USR_CONNECT_ORCID_FULFILLED:
      toast.success('Thank you for connecting your ORCID iD!');

      return { ...state, ...{ orcidAccount: action.payload } };

    case types.USR_REGISTER_USER_FULFILLED:
      toast.success('User registered, a confirmation email has been sent!');

      return state;

    case types.USR_UPDATE_USER_FULFILLED:
      toast.success('User successfully updated!');

      return state;

    case types.USR_LOGOUT_USER_FULFILLED:
    case types.USR_CLEAR_USER:
      return logoutUser();

    default:
      return state || {};
  }
};
