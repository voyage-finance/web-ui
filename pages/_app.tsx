import type { AppProps } from 'next/app';
import Layout from '../components/moleculas/Layout';
import { chain, defaultChains, Provider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { providers } from 'ethers';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'graphql/apollo-client';

const connectors = () => {
  return [
    new InjectedConnector({
      chains: [...defaultChains, chain.hardhat],
      options: { shimDisconnect: true },
    }),
  ];
};

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Provider
      autoConnect
      connectors={connectors}
      provider={({ chainId }) => {
        return chainId === chain.hardhat.id
          ? new providers.JsonRpcProvider('http://localhost:8545')
          : providers.getDefaultProvider();
      }}
    >
      <ApolloProvider client={ApolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
