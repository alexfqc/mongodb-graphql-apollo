import React from 'react';
import expect from 'expect';
import { renderIntoDocument, cleanup } from 'react-testing-library';
import Other from './Other';

afterEach(cleanup);

it('should render', () => {
  renderIntoDocument(<Other />);
  expect(document.body).toBeDefined();
});
