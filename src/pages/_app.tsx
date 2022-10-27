import { VoyageProvider } from '@components/base/VoyageProvider';
import Layout from '@components/moleculas/Layout';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import '../styles/global.scss';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY })]
);

const mm = new MetaMaskConnector({ chains });

const client = createClient({
  autoConnect: true,
  connectors: [mm],
  provider,
});

const queryClient = new QueryClient();

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        <VoyageProvider>
          <NotificationsProvider position="bottom-right" zIndex={501}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </VoyageProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
