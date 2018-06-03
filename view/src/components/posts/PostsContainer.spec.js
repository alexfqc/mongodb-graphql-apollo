import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import MockNetworkInterface from 'apollo-mocknetworkinterface';
import { renderIntoDocument, cleanup } from 'react-testing-library';
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

afterEach(cleanup);

it('should render without exploding', (done) => {
  const component = (
    <ApolloProvider client={client}>
      <div>
        <TestComponentWithApollo />
      </div>
    </ApolloProvider>
  );
  renderIntoDocument(component);
  done();
});
