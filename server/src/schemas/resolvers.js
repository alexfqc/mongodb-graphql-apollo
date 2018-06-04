import {ObjectID} from 'mongodb';

export default {
  Query: {
    allPosts: async (root, data, {mongo: {Posts}}) => Posts.find({}).toArray(),
    post: async (root, data, {mongo: {Posts}}) =>
      Posts.findOne({_id: new ObjectID(data.id)}),
  },
  Mutation: {
    createPost: async (root, data, {mongo: {Posts}}) => {
      const response = await Posts.insert(data);
      return Object.assign({id: response.insertedIds[0]}, data);
    },
  },

  Post: {
    id: root => root._id || root.id,
  },
};
