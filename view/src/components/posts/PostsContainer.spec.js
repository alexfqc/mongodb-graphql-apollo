import renderer from 'react-test-renderer';
import query from '../../utils/queries';
import PostsContainer from './PostsContainer';
import ApolloMock from '../../../test/helpers/apolloMock';

const mockedResponse = {
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
};

const apolloComponent = ApolloMock(PostsContainer, query, mockedResponse);

describe('Integration test', () => {
  let component;
  beforeEach(() => {
    component = renderer.create(apolloComponent);
  });

  it('should render loading correctly', () => {
    // first is loading
    const loading = component.toJSON();
    expect(loading).toMatch('Loading...');
  });

  it('should render posts correctly', (done) => {
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
});
