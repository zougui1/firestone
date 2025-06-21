import { MongoClient } from 'mongodb';
import Papr from 'papr';

if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL');
}

if (!process.env.DATABASE_NAME) {
  throw new Error('Missing DATABASE_NAME');
}

export const papr = new Papr();
export const client = new MongoClient(process.env.DATABASE_URL);

(async () => {
  await client.connect();
  papr.initialize(client.db(process.env.DATABASE_NAME));
  await papr.updateSchemas();
})().catch(error => {
  console.error('DATABASE CONNECTION ERROR:', error);
});
