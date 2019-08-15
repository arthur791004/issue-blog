import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import { getIsBrowser } from '@/utils';

const GRAPHQL_URL = 'https://api.github.com/graphql';
const isBrowser = getIsBrowser();

let client = null;

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  fetch: !isBrowser && fetch, // eslint-disable-line global-require
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.GITHUB_TOKEN;
  const authorization = token ? `Bearer ${token}` : '';

  return {
    headers: {
      ...headers,
      authorization,
    },
  };
});

const create = initialState =>
  new ApolloClient({
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });

export const createApolloClient = initialState => {
  // create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState);
  }

  if (!client) {
    client = create(initialState); // eslint-disable-line no-underscore-dangle
  }

  return client;
};
