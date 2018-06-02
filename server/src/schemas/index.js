import {makeExecutableSchema} from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Post {
    title: String
    description: String
  }

  type Query {
    allPosts: [Post]!
  }
`;

export default makeExecutableSchema({typeDefs, resolvers});
