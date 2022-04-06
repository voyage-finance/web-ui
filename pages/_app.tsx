import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { chain, defaultChains, Provider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { providers } from 'ethers';

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
