import type { AppProps } from 'next/app';
import Layout from '../components/moleculas/Layout';
import { chain, createClient, defaultChains, Provider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { providers } from 'ethers';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@graph/client';
import { NotificationsProvider } from '@mantine/notifications';
import { VoyageProvider } from '@components/base/VoyageProvider';

const connectors = () => {
  return [
    new InjectedConnector({
      chains: [...defaultChains, chain.hardhat],
      options: { shimDisconnect: true },
    }),
  ];
};

const web3Client = createClient({
  autoConnect: true,
  connectors,
  provider: ({ chainId }) => {
    return chainId === chain.hardhat.id
      ? new providers.JsonRpcProvider('http://localhost:8545', {
          chainId,
          name: 'hardhat',
        })
      : providers.getDefaultProvider();
  },
});

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Provider client={web3Client}>
      <ApolloProvider client={apolloClient}>
        <VoyageProvider>
          <NotificationsProvider position="top-right">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </VoyageProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
