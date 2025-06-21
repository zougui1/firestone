import { client, papr } from './client';
import { ConfigModel, FirestoneLibraryModel } from './models';

export const db = {
  client,
  papr,

  config: ConfigModel,
  firestoneLibrary: FirestoneLibraryModel,
};
