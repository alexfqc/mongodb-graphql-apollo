import React from 'react';
import { Query } from 'react-apollo';
import { ListGroup, ListGroupItem } from 'reactstrap';
import GET_POSTS from '../../utils/queries';

const PostsContainer = () => (
  <Query query={GET_POSTS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <ListGroup>
          {data.allPosts.map(post => <ListGroupItem key={post.id}>{post.title}</ListGroupItem>)}
        </ListGroup>
      );
    }}
  </Query>
);

export default PostsContainer;
