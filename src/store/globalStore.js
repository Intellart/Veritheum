// @flow
// eslint-disable-next-line no-unused-vars
import type { ReduxAction, ReduxState, ReduxActionWithPayload } from '../types';

export type State = {};

export const types: { ... } = {};

export const selectors: { ... } = {};

export const actions: { ... } = {};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    default:
      return state || {};
  }
};
