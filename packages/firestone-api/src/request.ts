import { z } from 'zod/v4';
import type WebSocket from 'ws';

import { sendRequest, type SendRequestData } from './sendRequest';
import { TaggedError } from '@zougui/firestone.error';
import { Result, ResultAsync } from 'neverthrow';

const RESPONSE_TIMEOUT = 3_000;

export class ResponseTimeoutError extends TaggedError('ResponseTimeoutError') {

}

export class ResponseParsingError extends TaggedError('ResponseParsingError') {

}

export class UserOnMultipleInstancesError extends TaggedError('UserOnMultipleInstancesError') {

}

export class ResponseError extends TaggedError('ResponseError')<{
  reason: unknown;
}> {

}

export class InvalidResponseError extends TaggedError('InvalidResponseError') {

}

export class UnexpectedResponseError extends TaggedError('UnexpectedResponseError') {

}

const safeJsonParse = Result.fromThrowable(JSON.parse, () => new ResponseParsingError());

const genericResponseSchema = z.object({
  Data: z.array(z.unknown()).optional(),
  Error: z.unknown().optional(),
  Function: z.string(),
  SubFunction: z.string().optional(),
});

export const request = <T extends z.ZodType>(request: RequestData<T>) => {
  return sendRequest(request).andThen(socket => {
    const promise = new Promise<z.infer<T>>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        onError(new ResponseTimeoutError());
      }, RESPONSE_TIMEOUT);

      const cleanup = () => {
        clearTimeout(timeoutId);
        socket.off('message', onMessage);
        socket.off('error', onError);
      }

      const onMessage = (message: WebSocket.RawData) => {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const jsonResult = safeJsonParse(message.toString('utf-8'));

        // ignore the message if invalid response
        if (jsonResult.isErr()) {
          return;
        }

        const genericResult = genericResponseSchema.safeParse(jsonResult.value);

        // ignore the message if invalid response type
        if (!genericResult.success) {
          return;
        }

        if (genericResult.data.Function === 'UserOnMultipleInstances') {
          return onError(new UserOnMultipleInstancesError());
        }

        const headersResult = request.responseSchema.safeParse(genericResult.data);

        // ignore the message if invalid response type
        if (!headersResult.success) {
          return;
        }

        if (genericResult.data.Error) {
          return onError(new ResponseError({ reason: genericResult.data.Error }));
        }

        const dataResult = request.dataSchema.safeParse(genericResult.data.Data);

        if (!dataResult.success) {
          return onError(new InvalidResponseError());
        }

        cleanup();
        resolve(dataResult.data);
      }

      const onError = (error: unknown) => {
        cleanup();
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        reject(error);
      }

      socket.on('message', onMessage);
      socket.on('error', onError);
    });

    return ResultAsync.fromPromise(promise, error => {
      if (error instanceof ResponseTimeoutError) {
        return error;
      }

      if (error instanceof ResponseParsingError) {
        return error;
      }

      if (error instanceof UserOnMultipleInstancesError) {
        return error;
      }

      if (error instanceof ResponseError) {
        return error;
      }

      if (error instanceof InvalidResponseError) {
        return error;
      }

      return new UnexpectedResponseError();
    });
  });
}

export interface RequestData<T extends z.ZodType> extends SendRequestData {
  responseSchema: z.ZodObject<{
    Function: z.ZodLiteral<string>;
    SubFunction?: z.ZodLiteral<string>;
  }>;
  dataSchema: T;
}
