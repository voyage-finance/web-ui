export enum VoyageEnvironment {
  Development = 'development',
  Staging = 'staging',
  Testnet = 'testnet',
  Mainnet = 'mainnet',
}

export enum Network {
  Hardhat = 'hardhat',
  Voyage = 'voyage',
  Fuji = 'fuji',
  Avalanche = 'avalanche',
}

export enum ChainID {
  Hardhat = 31337,
  Staging = 666,
  Fuji = 43113,
  Avalanche = 43114,
}

export const voyageEnvironment = (): VoyageEnvironment => {
  const env = process.env.NEXT_PUBLIC_VYG_ENV as VoyageEnvironment;
  switch (env) {
    case VoyageEnvironment.Development:
    case VoyageEnvironment.Staging:
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
}

const ProviderConfigurationMap: Record<VoyageEnvironment, ProviderConfig> = {
  [VoyageEnvironment.Development]: {
    chainId: ChainID.Hardhat,
    endpoint: 'http://localhost:8545',
    explorer: 'https://vethtet-explorer.staging.voyage.finance/',
    name: Network.Hardhat,
  },
  [VoyageEnvironment.Staging]: {
    chainId: ChainID.Staging,
    endpoint: 'https://vethtest.staging.voyage.finance/',
    explorer: 'https://vethtet-explorer.staging.voyage.finance/',
    name: Network.Voyage,
  },
  [VoyageEnvironment.Testnet]: {
    chainId: ChainID.Fuji,
    endpoint: 'https://fuji-c.staging.voyage.finance/rpc',
    explorer: 'https://testnet.snowtrace.io/',
    name: Network.Fuji,
  },
  [VoyageEnvironment.Mainnet]: {
    chainId: ChainID.Avalanche,
    endpoint: 'https://avax-c.staging.voyage.finance/rpc',
    explorer: 'https://snowtrace.io/',
    name: Network.Avalanche,
  },
};

export const voyageChains = Object.values(ProviderConfigurationMap).map(
  ({ chainId, endpoint, name }) => ({
    id: chainId,
    name,
    rpcUrls: { default: endpoint },
  })
);

export const getProviderConfiguration = () => {
  return ProviderConfigurationMap[voyageEnvironment()];
};

export const getTxExpolerLink = (hash: string) => {
  const { explorer: explorerUrl } = getProviderConfiguration();
  return `${explorerUrl}tx/${hash}`;
};
