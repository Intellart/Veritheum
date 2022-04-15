// @flow
import { merge } from 'lodash';
import * as API from '../api';
import type { ReduxAction, ReduxState } from '../types';

type FieldOfStudy = {
  id: number,
  fieldsName: string,
}

type SocialLinks = {
  [string]: string,
}

type Profile = {
  id: string,
  ORCID?: string,
  email: string,
  firstName: string,
  lastName: string,
  profileImg?: string,
  fieldOfStudy?: FieldOfStudy,
  socialLinks?: SocialLinks,
  updatedAt: Date,
  createdAt: Date,
  confirmedAt: Date,
}

export type State = {
  profile: Profile,
};

export const types = {
  USR_FETCH_USER: 'USR/FETCH_USER',
  USR_FETCH_USER_PENDING: 'USR/FETCH_USER_PENDING',
  USR_FETCH_USER_REJECTED: 'USR/FETCH_USER_REJECTED',
  USR_FETCH_USER_FULFILLED: 'USR/FETCH_USER_FULFILLED',
};

export const selectors = {
  getUser: (state: ReduxState): Profile => state.user.profile,
};

export const actions = {
  loginUser: (email: string): ReduxAction => ({
    type: types.USR_FETCH_USER,
    payload: API.getRequest(`users/sign_in?email=${email}`),
  }),
};

export const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case types.USR_FETCH_USER_FULFILLED:
      return merge({}, state, { profile: action.payload });

    default:
      return state || {};
  }
};
