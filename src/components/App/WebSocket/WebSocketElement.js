// @flow
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { secondsToMilliseconds } from 'date-fns';
import initWebSockets, { baseURL, retrySecondsDelay } from '../../../api/websockets';
import { connectionStates, selectors } from '../../../store/webSocketsStore';

function WebSocketElement(): null {
  const dispatch = useDispatch();
  const statusCode = useSelector(selectors.getStatusCode, isEqual);

  useEffect(() => {
    const webSocket = new WebSocket(baseURL + '/cable');
    if (statusCode !== connectionStates.OPEN) {
      initWebSockets(webSocket, dispatch);
    }

    return () => webSocket.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeoutID = null;

    if (statusCode === connectionStates.CLOSED) {
      timeoutID = setTimeout(() => {
        const webSocket = new WebSocket(baseURL + '/cable');
        initWebSockets(webSocket, dispatch);
      }, secondsToMilliseconds(retrySecondsDelay));
    }

    return () => clearTimeout(timeoutID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCode]);

  return null;
}

export default WebSocketElement;
