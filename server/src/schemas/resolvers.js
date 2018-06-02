export default {
  Query: {
    allPosts: async (root, data, {mongo: {Posts}}) => Posts.find({}).toArray(),
  },
  Mutation: {
    createPost: async (root, data, {mongo: {Posts}}) => {
      await Posts.insert(data);
      return data;
    },
  },
};
