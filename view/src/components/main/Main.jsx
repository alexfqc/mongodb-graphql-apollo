import React from 'react';
import { Route, Switch } from 'react-router';
import PostsContainer from '../posts/PostsContainer';

const Main = () => (
  <main>
    <Switch>
      <Route path="/" exact component={PostsContainer} />
    </Switch>
  </main>
);

export default Main;
