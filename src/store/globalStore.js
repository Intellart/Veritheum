// @flow
import { every, values, merge } from 'lodash';
import { types as nftTypes } from './nftStore';
import { types as categoriesTypes } from './categoriesStore';
import { types as exchangeRatesTypes } from './exchangeRatesStore';
import { types as userTypes } from './userStore';
import type { ReduxState, ReduxActionWithPayload } from '../types';

type Loading = {
  [string]: string
}

export type State = {
  loading: Loading
};

export const types: Object = {};

export const selectors = {
  checkIsLoading: (state: ReduxState): boolean => !every(values(state.global.loading), (ty) => ty === 'DONE'),
};

const updateLoading = (state: State, type: string, loadingState: string): State => {
  let key = type;
  key = key.replace('_FULFILLED', '');
  key = key.replace('_REJECTED', '');

  return merge({}, state, {
    loading: {
      [key]: loadingState,
    },
  });
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case userTypes.USR_FETCH_ALL_USERS_FULFILLED:
    case nftTypes.NFT_FETCH_NFTS_FULFILLED:
    case categoriesTypes.CATEGORY_GET_CATEGORIES_FULFILLED:
    case exchangeRatesTypes.ER_GET_RATES_FULFILLED:
      return updateLoading(state, action.type, 'DONE');

    case userTypes.USR_FETCH_ALL_USERS_REJECTED:
    case nftTypes.NFT_FETCH_NFTS_REJECTED:
    case categoriesTypes.CATEGORY_GET_CATEGORIES_REJECTED:
    case exchangeRatesTypes.ER_GET_RATES_REJECTED:
      return updateLoading(state, action.type, 'FAIL');

    default:
      return state || {};
  }
};
