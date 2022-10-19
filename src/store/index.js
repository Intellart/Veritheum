// @flow
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  concat, forEach, get, isString, includes, isEmpty, has,
} from 'lodash';
import { toast } from 'react-toastify';
import { isPromise } from '../utils';
import { reducer as globalStoreReducer } from './globalStore';
import { reducer as userStoreReducer, types as userStoreTypes } from './userStore';
import { reducer as nftStoreReducer, types as nftStoreTypes } from './nftStore';
import { reducer as createdNftStoreReducer, types as createdNftStoreTypes } from './createdNftStore';
import { reducer as sellNftStoreReducer, types as sellNftStoreTypes } from './sellNftStore';
import { reducer as categoryStoreReducer, types as categoriesStoreTypes } from './categoriesStore';
import { reducer as studyFieldStoreReducer, types as studyFieldStoreTypes } from './studyFieldsStore';
import { reducer as exchangeRatesStoreReducer, types as exchangeRatesTypes } from './exchangeRatesStore';
import { reducer as webSocketsStoreReducer } from './webSocketsStore';
import { reducer as walletStoreReducer } from './walletStore';
import { getItem } from '../localStorage';
import Error from '../components/App/Errors/Errors';
import type {
  ReduxAction,
  ReduxState,
  ReduxMiddlewareArgument,
  ActionChains,
} from '../types';

const ignoreErrors = [
  userStoreTypes.USR_FETCH_NFTS,
  nftStoreTypes.NFT_FETCH_NFTS,
  createdNftStoreTypes.NFT_FETCH_CREATED_NFTS,
  sellNftStoreTypes.NFT_FETCH_SELL_NFTS,
  categoriesStoreTypes.CATEGORY_GET_CATEGORIES,
  studyFieldStoreTypes.STUDY_FIELD_GET_STUDY_FIELDS,
];

const disableSanitizer = window.sessionStorage.getItem('disable_sanitizer') === 'true';
const sanitizedPayload = 'Set REACT_APP_REDUX_SANITIZER=false';
const actionSanitizer = (action: ReduxAction): ReduxAction => {
  if (!action.payload || disableSanitizer) return action;

  const sanitizedActions = [];

  return includes(sanitizedActions, action.type) ? { ...action, payload: sanitizedPayload } : action;
};

const stateSanitizer = (state: ReduxState): any => {
  // eslint-disable-next-line no-console
  if (get(process.env, 'REACT_APP_REDUX_STATE_LOG', '') === 'true') console.log(state);
  if (!state || disableSanitizer) return state;

  return {
    ...state,
  };
};

const actionsDenylist = () => get(process.env, 'REACT_APP_REDUX_ACTIONS_DENYLIST', '').split(',');

function promiseMiddleware({ dispatch }: ReduxMiddlewareArgument): any {
  return (next) => (action) => {
    if (action.payload && isPromise(action.payload)) {
      action.payload
        .then((payload) => {
          dispatch({ type: action.type + '_FULFILLED', payload });
        })
        .catch((e) => {
          const message = get(e, 'message') || get(e, 'errorMessage');
          const statusCode = get(e, 'code') || get(e, 'errorCode') || get(e, 'statusCode');
          dispatch({
            type: `${action.type}_REJECTED`,
            error: true,
            payload: {
              message,
              statusCode,
            },
          });

          if (includes(ignoreErrors, action.type)) return;

          const errors = get(e, 'response.data.errors');
          const isObject = has(errors, '[0].title');
          if (isObject) {
            forEach(errors, (err) => toast.error(<Error error={err} isObject={isObject} />));
          } else {
            toast.error(<Error error={e} isObject={isObject} />);
          }
        });

      return dispatch({ type: `${action.type}_PENDING` });
    }

    return next(action);
  };
}

export function chainActionsMiddleware(chainedActions: ActionChains): any {
  return ({ dispatch }: ReduxMiddlewareArgument) => (next) => (action) => {
    let nextActions = chainedActions[action.type];
    if (nextActions) {
      nextActions = concat(nextActions);
      forEach(nextActions, (nextAction) => {
        if (isString(nextAction)) {
          dispatch({ type: nextAction });
        } else {
          dispatch(nextAction(action));
        }
      });
    }

    return next(action);
  };
}

function dispatchRecorder(dispatchedActions: ?Array<string>): any {
  return () => (next) => (action) => {
    if (dispatchedActions && !actionsDenylist().includes(action.type)) {
      dispatchedActions.push(action.type);
    }

    return next(action);
  };
}

export const configureStore = (
  initialState: {} | ReduxState,
  actionChains: ?ActionChains,
  dispatchedActions: ?Array<string>,
): any => {
  const middleware = [thunk];
  if (dispatchedActions) {
    middleware.push(dispatchRecorder(dispatchedActions));
  }
  middleware.push(promiseMiddleware);
  if (actionChains) {
    middleware.push(chainActionsMiddleware(actionChains));
  }

  const sanitizers = get(process.env, 'REACT_APP_REDUX_SANITIZER') !== 'false' && { actionSanitizer, stateSanitizer };
  const composeEnhancers = composeWithDevTools({ ...sanitizers, actionsDenylist: actionsDenylist() });
  const middlewareApplier = composeEnhancers(applyMiddleware(...middleware));

  return createStore(
    combineReducers({
      global: globalStoreReducer,
      user: userStoreReducer,
      nfts: nftStoreReducer,
      createdNfts: createdNftStoreReducer,
      sellNfts: sellNftStoreReducer,
      categories: categoryStoreReducer,
      studyFields: studyFieldStoreReducer,
      exchangeRates: exchangeRatesStoreReducer,
      webSockets: webSocketsStoreReducer,
      wallet: walletStoreReducer,
    }),
    initialState,
    middlewareApplier,
  );
};

const localUser: string|null = getItem('user');

const initialReduxState: Object = {
  ...(!isEmpty(localUser) && localUser && {
    user: {
      profile: JSON.parse(localUser),
    },
  }),
  global: {
    loading: {
      [nftStoreTypes.NFT_FETCH_NFTS]: 'PENDING',
      [categoriesStoreTypes.CATEGORY_GET_CATEGORIES]: 'PENDING',
      [exchangeRatesTypes.ER_GET_RATES]: 'PENDING',
    },
  },
  wallet: {
    isOpen: false,
    whichWalletSelected: undefined,
    walletFound: false,
    walletIsEnabled: false,
    walletName: undefined,
    walletIcon: undefined,
    walletAPIVersion: undefined,
    wallets: [],

    networkId: undefined,
    balance: undefined,
    Utxos: [],
    Nfts: [],
    CollatUtxos: [],
    changeAddress: undefined,
    rewardAddress: undefined,
    usedAddress: undefined,

    txBody: undefined,
    txBodyCborHex_unsigned: '',
    txBodyCborHex_signed: '',
    submittedTxHash: '',

    addressBech32SendADA: 'addr_test1qrt7j04dtk4hfjq036r2nfewt59q8zpa69ax88utyr6es2ar72l7vd6evxct69wcje5cs25ze4qeshejy828h30zkydsu4yrmm',
    lovelaceToSend: 3000000,
    assetNameHex: '',
    assetPolicyIdHex: '',
    assetAmountToSend: 1,
    addressScriptBech32: 'addr_test1wrwd4hdwm7z9uvqusmckt64999qh63dafc495rwwec9twncha7q6c',
    datumStr: '12345678',
    plutusScriptCborHex: '4e4d01000033222220051200120011',
    transactionIdLocked: '',
    transactionIndxLocked: 0,
    lovelaceLocked: 3000000,
    manualFee: 900000,

    protocolParams: {
      linearFee: {
        minFeeA: '44',
        minFeeB: '155381',
      },
      minUtxo: '34482',
      poolDeposit: '500000000',
      keyDeposit: '2000000',
      maxValSize: 5000,
      maxTxSize: 16384,
      priceMem: 0.0577,
      priceStep: 0.0000721,
      coinsPerUtxoWord: '34482',
    },

    plutusNfts: {},
  },
};

export const store: any = configureStore(initialReduxState);
