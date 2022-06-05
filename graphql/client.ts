import { ApolloClient, InMemoryCache } from '@apollo/client';
import e from '@beam-australia/react-env';

const uri = process.env.NODE_ENV === 'production' ? e('GQL_URL') : '/graphql';

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
