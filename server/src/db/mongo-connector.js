import {MongoClient} from 'mongodb';

const DATA_BASE_CONNECTION = 'mongodb://mongo/db';

export default async () => {
  const db = await MongoClient.connect(DATA_BASE_CONNECTION);
  return {
    Posts: db.collection('posts'),
  };
};
