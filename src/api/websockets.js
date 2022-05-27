// @flow
import React from 'react';
import { get, isEmpty } from 'lodash';
import { secondsToMilliseconds } from 'date-fns';
import { toast } from 'react-toastify';
import Error from '../components/App/Errors/Errors';
import { isDevelopment } from '../utils';
import { actions } from '../store/webSocketsStore';

export const retrySecondsDelay = 10;

export const baseURL: string = isDevelopment ? 'ws://localhost:' + get(process.env, 'REACT_APP_LOCAL_API_PORT', '3000') : get(process.env, 'REACT_APP_WS_URL', '');

function initWebSockets(webSocket: WebSocket, dispatch: Function, timeoutID?: Object) {
  let timeOutID = clearTimeout(timeoutID);
  const socketChannel = 'GeneralChannel';

  webSocket.onopen = () => {
    const subscribeMessage = {
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: socketChannel,
      }),
    };

    webSocket.send(JSON.stringify(subscribeMessage));
    dispatch(actions.handleConnecting({
      statusCode: webSocket.readyState,
    }));
  };

  webSocket.onerror = (error) => {
    toast.error(<Error
      error={{
        status: 500,
        title: 'Websocket error',
        detail: 'Websockets has disconected unexpectedly',
      }}
      isObject
    />);

    dispatch(actions.handleError({
      statusCode: webSocket.readyState,
      lastError: error,
    }));

    timeOutID = setTimeout(() => {
      const newWebSocket = new WebSocket(baseURL + '/cable');
      initWebSockets(newWebSocket, dispatch, timeOutID);
    }, secondsToMilliseconds(retrySecondsDelay));
  };

  webSocket.onclose = () => dispatch(actions.handleClose({
    statusCode: webSocket.readyState,
  }));

  webSocket.onmessage = (event: Object) => {
    const incomingMessage = JSON.parse(event.data);

    if (incomingMessage.type === 'ping') return;
    if (incomingMessage.type === 'welcome') {
      dispatch(actions.handleConnected({
        statusCode: webSocket.readyState,
        connectedTo: webSocket.url,
        channel: socketChannel,
      }));
    }

    if (!isEmpty(incomingMessage.message, 'data')) {
      dispatch(actions.handleMessage(incomingMessage.message));
    }
  };
}

export default initWebSockets;
