import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://fakeql.com/graphql/282075c8de7253d05d37f95ee9db8cb8',
  cache: new InMemoryCache(),
});

export default client;
