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

  type Mutation {
    createPost(title: String!, description: String!): Post
  }
`;

export default makeExecutableSchema({typeDefs, resolvers});
