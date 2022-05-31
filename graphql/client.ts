import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_VYG_ENV === 'development'
      ? '/graphql'
      : process.env.NEXT_PUBLIC_GQL_URL,
  cache: new InMemoryCache(),
});

export default client;
