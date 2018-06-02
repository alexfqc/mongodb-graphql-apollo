import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import connectMongo from './db/mongo-connector';
import schema from './schemas/index';

const start = async () => {
  const mongo = await connectMongo();
  const PORT = 4000;
  const app = express();
  app.use(cors());
  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({schema, context: {mongo}}),
  );
  // if you want GraphiQL enabled - disable at production
  app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

  app.listen(PORT);
};

start();
