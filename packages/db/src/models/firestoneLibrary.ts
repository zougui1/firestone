import { schema, types } from 'papr';

import { papr } from '../client';

export const FirestoneLibraryModel = papr.model('firestoneLibraries', schema({
  treeLevel: types.number({ required: true }),
  upgrades: types.objectGeneric(
    types.object({ level: types.number({ required: true }) }),
    undefined,
    { required: true }
  ),
}));
