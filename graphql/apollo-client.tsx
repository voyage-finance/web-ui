import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://fakeql.com/graphql/96febe45b31f52658d984eaed6187194',
  cache: new InMemoryCache(),
});

export default client;
