import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_GQL_URL
    : '/graphql';

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
