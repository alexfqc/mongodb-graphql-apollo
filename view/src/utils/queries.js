import gql from 'graphql-tag';

const GET_POSTS = gql`
  query posts {
    allPosts {
      id
      title
      description
    }
  }
`;

export default GET_POSTS;
