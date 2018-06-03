/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider, graphql } from 'react-apollo';
import MockNetworkInterface from 'apollo-mocknetworkinterface';

export default (component, query, mockedResponse) => {
  const TestComponentWithApollo = graphql(query)(component);

  const createResponse = () => mockedResponse;
  const fetch = MockNetworkInterface(createResponse, { timeout: 100 });

  const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:4000', fetch }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <TestComponentWithApollo />
    </ApolloProvider>
  );
};
