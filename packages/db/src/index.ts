import { ObjectId } from 'mongodb';

import { client, papr } from './client';
import * as models from './models';

export const db = {
  ...models,
  client,
  papr,
  ObjectId,
};
