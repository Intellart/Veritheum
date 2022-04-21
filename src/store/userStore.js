// @flow
import * as API from '../api';
import type { ReduxAction, ReduxState } from '../types';

type Profile = {
  id: string,
  email: string,
  first_name: string,
  last_name: string,
  updatedAt: Date,
  createdAt: Date,
  confirmedAt: Date,
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
}

export type State = {
  profile: Profile,
};

export const types = {
  USR_LOGIN_USER: 'USR/LOGIN_USER',
  USR_LOGIN_USER_PENDING: 'USR/LOGIN_USER_PENDING',
  USR_LOGIN_USER_REJECTED: 'USR/LOGIN_USER_REJECTED',
  USR_LOGIN_USER_FULFILLED: 'USR/LOGIN_USER_FULFILLED',

  USR_REGISTER_USER: 'USR/REGISTER_USER',
  USR_REGISTER_USER_PENDING: 'USR/REGISTER_USER_PENDING',
  USR_REGISTER_USER_REJECTED: 'USR/REGISTER_USER_REJECTED',
  USR_REGISTER_USER_FULFILLED: 'USR/REGISTER_USER_FULFILLED',
};

export const selectors = {
  getUser: (state: ReduxState): Profile => state.user.profile,
};

export const actions = {
  loginUser: (payload: LoginCredentials): ReduxAction => ({
    type: types.USR_LOGIN_USER,
    payload: API.postRequest('users/sign_in', payload),
  }),
  registerUser: (payload: RegisterCredentials): ReduxAction => ({
    type: types.USR_REGISTER_USER,
    payload: API.postRequest('users', payload),
  }),
};

export const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case types.USR_LOGIN_USER_FULFILLED:
      window.location.replace('profile');

      return { ...state, ...{ profile: action.payload } };
    default:
      return state || {};
  }
};
