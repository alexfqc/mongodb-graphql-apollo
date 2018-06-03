import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import MockNetworkInterface from 'apollo-mocknetworkinterface';
import renderer from 'react-test-renderer';
import query from '../../utils/queries';
import PostsContainer from './PostsContainer';

const TestComponentWithApollo = graphql(query)(PostsContainer);

const createResponse = () => ({
  data: {
    allPosts: [
      {
        id: '1',
        title: 'title',
        description: 'description',
        __typename: '',
      },
    ],
  },
});
const mockedNetworkFetch = MockNetworkInterface(createResponse, { timeout: 100 });
const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000', fetch: mockedNetworkFetch }),
  cache: new InMemoryCache(),
});

const ApolloHoc = Component => (
  <ApolloProvider client={client}>
    <Component />
  </ApolloProvider>
);

it('Integration test', (done) => {
  const component = renderer.create(ApolloHoc(TestComponentWithApollo));

  // first is loading
  const loading = component.toJSON();
  expect(loading).toMatch('Loading...');

  // wait until data arrive
  setTimeout(() => {
    try {
      const tree2 = component.toJSON();
      expect(tree2.children[0].children).toMatchObject(['title']);
    } catch (e) {
      return done.fail(e);
    }
    return done();
  }, 101);
});
