import React from 'react';
import { Query } from 'react-apollo';
import GET_POSTS from '../../utils/queries';

const PostsContainer = () => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          {data.allPosts.map(post => (
            <div key={post.id}>
              <div>{post.title}</div>
              <div>{post.description}</div>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default PostsContainer;
