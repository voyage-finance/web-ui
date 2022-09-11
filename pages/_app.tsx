import { ApolloProvider } from '@apollo/client';
import { VoyageProvider } from '@components/base/VoyageProvider';
import apolloClient from '@graph/client';
import { NotificationsProvider } from '@mantine/notifications';
import type { AppProps } from 'next/app';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import Layout from '../components/moleculas/Layout';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.goerli, chain.hardhat],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    publicProvider(),
  ]
);

const mm = new MetaMaskConnector({ chains });

const client = createClient({
  autoConnect: true,
  connectors: [mm],
  provider,
  webSocketProvider,
});

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <WagmiConfig client={client}>
      <ApolloProvider client={apolloClient}>
        <VoyageProvider>
          <NotificationsProvider position="bottom-right" zIndex={501}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </VoyageProvider>
      </ApolloProvider>
    </WagmiConfig>
  );
}

export default MyApp;
