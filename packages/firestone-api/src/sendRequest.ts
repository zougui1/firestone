import { errAsync, okAsync, ResultAsync } from 'neverthrow';
import type WebSocket from 'ws';

import { TaggedError } from '@zougui/firestone.error';

import { type State, store, waitSocket, ConnectionError } from './store';
import { CONNECTION_TIMEOUT } from './constants';
import { stringifyRequest } from './stringifyRequest';

export class ConnectionTimeoutError extends TaggedError('ConnectionTimeoutError') {

}

export class RequestError extends TaggedError('RequestError')<{
  missingField: keyof State['staticData'];
}> {

}

const waitConnection = (socket: WebSocket) => {
  if (socket.readyState === socket.OPEN) {
    return okAsync(socket);
  }

  const promise = new Promise<WebSocket>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      cleanup();
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      reject(new ConnectionTimeoutError());
    }, CONNECTION_TIMEOUT);

    const cleanup = () => {
      socket.off('open', onOpen);
      socket.off('error', onError);
      clearTimeout(timeoutId);
    }

    const onOpen = () => {
      cleanup();
      resolve(socket);
    }

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    }

    socket.on('open', onOpen);
    socket.on('error', onError);
  });

  return ResultAsync.fromPromise(promise, error => {
    if (error instanceof ConnectionTimeoutError) {
      return error;
    }

    return new ConnectionError()
  });
}

const ensureConnection = () => {
  return waitSocket().andThen(socket => {
    if (socket.readyState === socket.OPEN) {
      return okAsync(socket);
    }

    if (
      socket.readyState === socket.CLOSED ||
      socket.readyState === socket.CLOSING
    ) {
      store.trigger.tryReconnect();
      return waitSocket().andThen(waitConnection);
    }

    return waitConnection(socket);
  });
}

export const sendRequest = (data: SendRequestData) => {
  return ensureConnection().andThen(socket => {
    const {
      userId,
      sessionId,
      gameVersion,
      serverName,
     } = store.getSnapshot().context.staticData;

    if (!userId) {
      return errAsync(new RequestError({ missingField: 'userId' }));
    }

    if (!sessionId) {
      return errAsync(new RequestError({ missingField: 'sessionId' }));
    }

    if (!gameVersion) {
      return errAsync(new RequestError({ missingField: 'gameVersion' }));
    }

    if (!serverName) {
      return errAsync(new RequestError({ missingField: 'serverName' }));
    }

    const request = stringifyRequest({
      ...data,
      userId,
      sessionId,
      gameVersion,
      serverName,
    });

    socket.send(Buffer.from(request, 'utf-8'));
    return okAsync(socket);
  });
}

export interface SendRequestData {
  type: string;
  parameters?: (string | number)[];
}
