// @flow
/* istanbul ignore file */
import type { State as GlobalState } from '../store/globalStore';
import type { State as UserState } from '../store/userStore';
import type { State as NftState } from '../store/nftStore';
import type { State as CategoryState } from '../store/categoriesStore';
import type { State as StudyFieldsState } from '../store/studyFieldsStore';
import type { State as ExchangeRatesState } from '../store/exchangeRatesStore';
import type { State as WebSocketState } from '../store/webSocketsStore';
import type { Wallet as WalletState } from '../store/walletStore';

export type ReduxState = {
  user: UserState,
  global: GlobalState,
  nfts: NftState,
  categories: CategoryState,
  studyFields: StudyFieldsState,
  exchangeRates: ExchangeRatesState,
  webSockets: WebSocketState,
  wallet: WalletState,
};

export type BaseReduxAction = {
  type: string,
};

export type PayloadReduxAction = {
  type: string,
  payload: any,
};

export type ReduxAction = {
  type: string,
  payload?: any,
};
export type ReduxActionWithPayload = {
  type: string,
  payload: any,
};

export type ReduxMiddlewareArgument = {
  dispatch: Function,
  getState: () => ReduxState,
};

export type ErrorContent = {
  message: ?string,
  statusCode?: ?(string | number),
  name?: ?string,
};

export type ErrorAction = {
  type: string,
  error: true,
  payload: ErrorContent,
};

type CauseActionType = string;
type NextAction = (() => ReduxAction) | string;

export type ActionChains = {
  [CauseActionType]: Array<NextAction> | NextAction,
};

export type DispatchFn = (BaseReduxAction | PayloadReduxAction) => void;

export type AsyncCallback = (...any) => void;
