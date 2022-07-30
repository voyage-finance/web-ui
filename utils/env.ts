import { Chain } from '@wagmi/core';

export enum VoyageEnvironment {
  Development = 'development',
  Testnet = 'testnet',
  Mainnet = 'mainnet',
}

export enum Network {
  Hardhat = 'Hardhat',
  Voyage = 'Voyage POA',
  Rinkeby = 'Rinkeby Testnet',
  Avalanche = 'Avalanche C-Chain',
}

export enum ChainID {
  Hardhat = 31337,
  Rinkeby = 4,
  Avalanche = 43114,
}

export const voyageEnvironment = (): VoyageEnvironment => {
  const env =
    (process.env.NEXT_PUBLIC_VYG_ENV as VoyageEnvironment) ||
    VoyageEnvironment.Testnet;
  console.log('env: ', process.env.NEXT_PUBLIC_VYG_ENV);
  switch (env) {
    case VoyageEnvironment.Development:
    case VoyageEnvironment.Testnet:
    case VoyageEnvironment.Mainnet:
      return env;
  }
};

interface ProviderConfig {
  chainId: number;
  endpoint: string;
  explorer: string;
  name: Network;
  currency: Currency;
}

interface Currency {
  name: string;
  symbol: string;
  decimals: number;
}

const ProviderConfigurationMap: Record<VoyageEnvironment, ProviderConfig> = {
  [VoyageEnvironment.Development]: {
    chainId: ChainID.Hardhat,
    endpoint: 'http://localhost:8545',
    explorer: 'https://vethtet-explorer.staging.voyage.finance/',
    name: Network.Hardhat,
    currency: {
      name: 'Voyage',
      symbol: 'VYG',
      decimals: 18,
    },
  },
  [VoyageEnvironment.Testnet]: {
    chainId: ChainID.Rinkeby,
    endpoint:
      'https://eth-rinkeby.alchemyapi.io/v2/2rkHcv3Pdg7j3iHPWUu9cDsEOtSoXtoB',
    explorer: 'https://etherscan.io/',
    name: Network.Rinkeby,
    currency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [VoyageEnvironment.Mainnet]: {
    chainId: ChainID.Avalanche,
    endpoint: 'https://avax-c.staging.voyage.finance/rpc',
    explorer: 'https://snowtrace.io/',
    name: Network.Avalanche,
    currency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
  },
};

export const voyageChains: Chain[] = Object.values(
  ProviderConfigurationMap
).map(({ chainId, endpoint, name, explorer, currency }) => ({
  id: chainId,
  name,
  nativeCurrency: currency,
  blockExplorers: {
    etherscan: { name: 'default', url: explorer },
    default: { name: 'default', url: explorer },
  },
  rpcUrls: { default: endpoint },
}));

export const getProviderConfiguration = () => {
  return ProviderConfigurationMap[voyageEnvironment()];
};

export const getTxExpolerLink = (hash: string) => {
  const { explorer: explorerUrl } = getProviderConfiguration();
  return `${explorerUrl}tx/${hash}`;
};

export const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID || '';
