// @flow
import type { ReduxState, ReduxActionWithPayload, ReduxAction } from '../types';

export const connectionStates = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export type State = {
  connectedTo: string | null,
  channel: string,
  status: string,
  statusCode: number,
  lastError: Object,
};

type CodePayload = {
  statusCode: number,
};

type ErrorPayload = {
  lastError: any,
};

type ConnectedPayload = {
  connectedTo: string,
  channel: string,
};

export type MessagePayload = {
  type: string,
  data: any,
};

export const types = {
  WS_CONNECTING: 'WS/CONNECTING',
  WS_CONNECTED: 'WS/CONNECTED',
  WS_ERROR: 'WS/ERROR',
  WS_CLOSED: 'WS/CLOSED',
  WS_MESSAGE: 'WS/MESSAGE',
};

export const selectors = {
  getStore: (state: ReduxState): State => state.webSockets,
  getStatusCode: (state: ReduxState): number => state.webSockets.statusCode,
};

export const actions = {
  handleConnecting: (payload: CodePayload): ReduxAction => ({
    type: types.WS_CONNECTING,
    payload,
  }),
  handleConnected: (payload: CodePayload&ConnectedPayload): ReduxAction => ({
    type: types.WS_CONNECTED,
    payload,
  }),
  handleError: (payload: CodePayload&ErrorPayload): ReduxAction => ({
    type: types.WS_ERROR,
    payload,
  }),
  handleClose: (payload: CodePayload): ReduxAction => ({
    type: types.WS_CLOSED,
    payload,
  }),
  handleMessage: (payload: MessagePayload): ReduxAction => ({
    type: types.WS_MESSAGE,
    payload,
  }),
};

const statusCodeType = (statusCode: number) => {
  switch (statusCode) {
    case connectionStates.CONNECTING:
      return 'CONNECTING';
    case connectionStates.OPEN:
      return 'OPEN';
    case connectionStates.CLOSING:
      return 'CLOSING';
    case connectionStates.CLOSED:
      return 'CLOSED';

    default:
      return '';
  }
};

const handleConnection = (state: State, payload: CodePayload&Object): State => ({
  lastError: state.lastError,
  status: statusCodeType(payload.statusCode),
  ...payload,
});

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.WS_CONNECTING:
    case types.WS_CONNECTED:
    case types.WS_CLOSED:
    case types.WS_ERROR:
      return handleConnection(state, action.payload);

    default:
      return state || {};
  }
};
