// @flow
import * as API from '../api';
// eslint-disable-next-line no-unused-vars
import type { ReduxAction, ReduxState, ReduxActionWithPayload } from '../types';

export type Category = {
  id: number,
  category_name: string,
}

export type State = Category[];

export const types = {
  CATEGORY_GET_CATEGORIES: 'CATEGORY/GET_CATEGORY',
  CATEGORY_GET_CATEGORIES_PENDING: 'CATEGORY/GET_CATEGORY_PENDING',
  CATEGORY_GET_CATEGORIES_REJECTED: 'CATEGORY/GET_CATEGORY_REJECTED',
  CATEGORY_GET_CATEGORIES_FULFILLED: 'CATEGORY/GET_CATEGORY_FULFILLED',
};

export const selectors = {
  getCategories: (state: ReduxState): Category => state.categories,
};

export const actions = {
  getCategories: (): ReduxAction => ({
    type: types.CATEGORY_GET_CATEGORIES,
    payload: API.getRequest('categories').then((response) => response),
  }),
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.CATEGORY_GET_CATEGORIES_FULFILLED:
      return action.payload;

    default:
      return state || {};
  }
};
