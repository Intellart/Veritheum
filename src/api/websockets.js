// @flow
import React from 'react';
import {
  get, isEmpty, has, forEach,
} from 'lodash';
import { toast } from 'react-toastify';
import Error from '../components/App/Errors/Errors';
import { isDevelopment } from '../utils';

export type Message = {
  type: string,
  data: any,
};

const baseURL: string = isDevelopment ? 'ws://localhost:' + get(process.env, 'REACT_APP_LOCAL_API_PORT', '3000') : get(process.env, 'REACT_APP_WS_URL', '');

export const types = {
  WS_SUBSCRIBE_PENDING: 'WS/SUBSCRIBE_PENDING',
  WS_SUBSCRIBE_FULFILED: 'WS/SUBSCRIBE_FULFILED',
  WS_SUBSCRIBE_REJECTED: 'WS/SUBSCRIBE_REJECTED',
  WS_CONNECTION_CLOSED: 'WS/CONNECTION_CLOSED',
  WS_UPDATE: 'WS/UPDATE',
};

function initWebSockets(dispatch: Function) {
  const webSocket = new WebSocket(baseURL + '/cable');

  webSocket.onopen = () => {
    dispatch({
      type: types.WS_SUBSCRIBE_PENDING,
    });

    const subscribeMessage = {
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: 'GeneralChannel',
      }),
    };

    webSocket.send(JSON.stringify(subscribeMessage));
  };

  webSocket.onerror = (error) => {
    dispatch({
      type: types.WS_SUBSCRIBE_REJECTED,
      payload: error,
    });

    const errors = get(error, 'response.data.errors');
    const isObject = has(errors, '[0].title');
    if (isObject) {
      forEach(errors, (err) => toast.error(<Error error={err} isObject={isObject} />));
    } else {
      toast.error(<Error error={error} isObject={isObject} />);
    }

    initWebSockets(dispatch);
  };

  webSocket.onclose = () => {
    dispatch({
      type: types.WS_CONNECTION_CLOSED,
    });

    initWebSockets(dispatch);
  };

  webSocket.onmessage = (event: Object) => {
    const incomingMessage = JSON.parse(event.data);

    if (incomingMessage.type === 'ping') return;
    if (incomingMessage.type === 'welcome') {
      dispatch({
        type: types.WS_SUBSCRIBE_FULFILED,
      });
    }

    if (!isEmpty(incomingMessage.message, 'data')) {
      dispatch({
        type: types.WS_UPDATE,
        payload: incomingMessage.message,
      });
    }
  };
}

export default initWebSockets;
