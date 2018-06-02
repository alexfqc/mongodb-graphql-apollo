import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const render = (Component) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'),
  );
};

render(App);

if (process.env.NODE_ENV === 'development') {
  module.hot.accept('./App', () => {
    render(App);
  });
}
