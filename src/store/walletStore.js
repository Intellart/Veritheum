// @flow
import { buildSendTokenToPlutusScript, fetchNftData, refreshData } from '../utils/helpers';
import type { ReduxState, ReduxActionWithPayload, ReduxAction } from '../types';

export type TransactionUnspentOutput = {
    ptr: number
}

export type Nft = {
    asset: string,
    data?: Object,
}

export type Utxo = {
    txid: string,
    txindx: number,
    amount: string,
    str: string,
    multiAssetStr: string,
    TransactionUnspentOutput: TransactionUnspentOutput
}

export type Wallet = {
    walletIsEnabled: Boolean,
    walletName: String,
    balance: number,
    Utxos: [Utxo],
    Nfts: [Nft],
    api_version: string,
    network_id: number,
    changeAddress: string,
    rewardAddress: string,
}

export const types: Object = {
  WALLET_SAVE: 'WALLET_SAVE',

  WALLET_REFRESH_DATA: 'WALLET_REFRESH_DATA',
  WALLET_REFRESH_DATA_FULFILLED: 'WALLET_REFRESH_DATA_FULFILLED',

  WALLET_NFT_DATA: 'WALLET_NFT_DATA',
  WALLET_NFT_DATA_FULFILLED: 'WALLET_NFT_DATA_FULFILLED',
};

export const selectors = {
  getWalletEnabled: (state: ReduxState): Boolean => state.wallet.walletIsEnabled,
};

export const actions = {
  saveWallet: (state: any): ReduxAction => ({
    type: types.WALLET_SAVE,
    payload: state,
  }),
  refreshData: (state: any): ReduxAction => ({
    type: types.WALLET_REFRESH_DATA,
    payload: refreshData(state),
  }),
  fetchNftData: (nfts: Nft[]): ReduxAction => ({
    type: types.WALLET_NFT_DATA,
    payload: fetchNftData(nfts),
  }),
};

export const reducer = (state: Wallet, action: ReduxActionWithPayload): Wallet => {
  switch (action.type) {
    case types.WALLET_NFT_DATA_FULFILLED:
      return { ...state, ...{ Nfts: action.payload } };
    case types.WALLET_REFRESH_DATA_FULFILLED:
    case types.WALLET_SAVE:
      return { ...state, ...action.payload };

    default:
      return state || {};
  }
};
