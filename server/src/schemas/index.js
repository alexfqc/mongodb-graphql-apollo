import {makeExecutableSchema} from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Post {
    id: ID!
    title: String
    description: String
  }

  type Query {
    allPosts: [Post]!
    post(id: ID!): Post!
  }

  type Mutation {
    createPost(title: String!, description: String!): Post
  }
`;

export default makeExecutableSchema({typeDefs, resolvers});
