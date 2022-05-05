import type { AppProps } from 'next/app';
import Layout from '../components/moleculas/Layout';
import { chain, createClient, defaultChains, Provider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { providers } from 'ethers';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'graphql/apollo-client';
import { NotificationsProvider } from '@mantine/notifications';

const connectors = () => {
  return [
    new InjectedConnector({
      chains: [...defaultChains, chain.hardhat],
      options: { shimDisconnect: true },
    }),
  ];
};

const client = createClient({
  autoConnect: true,
  connectors,
  provider: ({ chainId }) => {
    return chainId === chain.hardhat.id
      ? new providers.JsonRpcProvider('http://localhost:8545')
      : providers.getDefaultProvider();
  },
});

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Provider client={client}>
      <ApolloProvider client={ApolloClient}>
        <NotificationsProvider position="top-right">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationsProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
