import WebSocket from 'ws';
import { createStore } from '@xstate/store';
import { okAsync, ResultAsync } from 'neverthrow';

import { TaggedError } from '@zougui/firestone.error';

import { CONNECTION_TIMEOUT } from './constants';

export class UnconnectedError extends TaggedError('UnconnectedError') {

}

export class ConnectionError extends TaggedError('ConnectionError') {

}

export interface State {
  socket?: WebSocket;
  serverUrl?: string;
  staticData: {
    userId?: string;
    sessionId?: string;
    gameVersion?: string;
    serverName?: string;
  };
}

const initialState: State = {
  staticData: {},
};

export const store = createStore({
  context: initialState,
  on: {
    init: (context, event: { serverUrl: string; }) => {
      const socket = new WebSocket(event.serverUrl, {
        rejectUnauthorized: false,
      });

      return {
        ...context,
        socket,
        serverUrl: event.serverUrl,
      };
    },

    tryReconnect: (context) => {
      if (!context.serverUrl) {
        return context;
      }

      const socket = new WebSocket(context.serverUrl, {
        rejectUnauthorized: false,
      });

      return {
        ...context,
        socket,
      };
    },

    setStaticData: (context, event: State['staticData']) => {
      return {
        ...context,
        staticData: {
          userId: event.userId ?? context.staticData.userId,
          sessionId: event.sessionId ?? context.staticData.sessionId,
          gameVersion: event.gameVersion ?? context.staticData.gameVersion,
          serverName: event.serverName ?? context.staticData.serverName,
        },
      };
    },
  },
});

const promises = new Set<PromiseWithResolvers<WebSocket>>();

store.select(state => state.socket).subscribe(socket => {
  if (socket) {
    for (const { resolve } of promises) {
      resolve(socket);
    }
  }
});

export const waitSocket = () => {
  const { socket } = store.getSnapshot().context;

  if (socket) {
    return okAsync(socket);
  }

  const promise = Promise.withResolvers<WebSocket>();
  promises.add(promise);

  const timeoutId = setTimeout(() => {
    promise.reject(new UnconnectedError());
  }, CONNECTION_TIMEOUT);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  promise.promise.finally(() => {
    promises.delete(promise);
    clearTimeout(timeoutId);
  });

  return ResultAsync.fromPromise(promise.promise, error => {
    if (error instanceof UnconnectedError) {
      return error;
    } else {
      return new ConnectionError();
    }
  });
}
