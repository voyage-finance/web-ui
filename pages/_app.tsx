import type { AppProps } from 'next/app';
import Layout from '../components/moleculas/Layout';
import { createClient, defaultChains, Provider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { providers } from 'ethers';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@graph/client';
import { NotificationsProvider } from '@mantine/notifications';
import { VoyageProvider } from '@components/base/VoyageProvider';
import { getProviderConfiguration, voyageChains } from '../utils/env';

const connectors = () => {
  return [
    new InjectedConnector({
      chains: [...defaultChains, ...voyageChains],
      options: { shimDisconnect: true },
    }),
  ];
};

const web3Client = createClient({
  autoConnect: true,
  connectors,
  provider: ({ chainId }) => {
    const {
      endpoint,
      name,
      chainId: defaultChainId,
    } = getProviderConfiguration();
    return new providers.JsonRpcProvider(endpoint, {
      chainId: chainId ?? defaultChainId,
      name,
    });
  },
});

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Provider client={web3Client}>
      <ApolloProvider client={apolloClient}>
        <VoyageProvider>
          <NotificationsProvider position="bottom-right">
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
