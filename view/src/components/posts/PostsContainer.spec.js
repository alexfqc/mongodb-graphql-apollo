import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import renderer from 'react-test-renderer';
import MockNetworkInterface from 'apollo-mocknetworkinterface';
import query from '../../utils/queries';
import PostsContainer from './PostsContainer';

const TestComponentWithApollo = graphql(query)(PostsContainer);

const createResponse = (request) => {
  // pure function returning data
  console.log('creating mocked response for request:', request); // eslint-disable-line no-console
  // will log: creating mocked response for request: { query: { kind: 'Document' ...
  return {
    data: {
      allPosts: [
        {
          id: '1', title: 'title', description: 'description', __typename: '',
        },
      ],
    },
  };
};
const mockedNetworkFetch = MockNetworkInterface(createResponse, { timeout: 100 });
const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000', fetch: mockedNetworkFetch }),
  cache: new InMemoryCache(),
});

it('should render without exploding', (done) => {
  const component = renderer.create(
    <ApolloProvider client={client}>
      <div>
        <TestComponentWithApollo />
      </div>
    </ApolloProvider>);
  done();
});
