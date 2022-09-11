export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export enum Network {
  Mainnet = 'mainnet',
  Goerli = 'goerli',
  Hardhat = 'hardhat',
}

export enum ChainID {
  Mainnet = 1,
  Goerli = 5,
  Hardhat = 31337,
}

export const networkByChainID: Record<ChainID, Network> = {
  [ChainID.Mainnet]: Network.Mainnet,
  [ChainID.Goerli]: Network.Goerli,
  [ChainID.Hardhat]: Network.Hardhat,
};

interface ProviderConfig {
  name: Network;
  chainId: ChainID;
  endpoint: string;
  explorer: string;
  currency: Currency;
}

interface Currency {
  name: string;
  symbol: string;
  decimals: number;
}

export const voyageEnvironment = (): Environment => {
  return (
    (process.env.NEXT_PUBLIC_ENV as Environment) || Environment.Development
  );
};

const defaultProviderConfiguration: Record<Environment, ProviderConfig> = {
  [Environment.Development]: {
    chainId: ChainID.Hardhat,
    endpoint: 'http://localhost:8545',
    explorer: '',
    name: Network.Hardhat,
    currency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [Environment.Staging]: {
    chainId: ChainID.Goerli,
    endpoint:
      'https://eth-goerli.g.alchemy.com/v2/IG5Is2xWE1WkB-h0cN1NX58xw_74WEZj',
    explorer: 'https://goerli.etherscan.io/',
    name: Network.Goerli,
    currency: {
      name: 'Ether',
      symbol: 'GoerliETH',
      decimals: 18,
    },
  },
  [Environment.Production]: {
    chainId: ChainID.Mainnet,
    endpoint:
      'https://eth-mainnet.g.alchemy.com/v2/_ugyedYRT9AOVAGTuXNVKSgFuauulnkC',
    explorer: 'https://etherscan.io/',
    name: Network.Mainnet,
    currency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
};

function resolveChainId(defaultChainId: ChainID): ChainID {
  return process.env.NEXT_PUBLIC_CHAIN_ID
    ? (parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) as ChainID)
    : defaultChainId;
}

function resolveNodeUrl(defaultNodeUrl: string): string {
  return process.env.NEXT_PUBLIC_PROVIDER_URL ?? defaultNodeUrl;
}

function resolveNetwork(chainID: ChainID): Network {
  return networkByChainID[chainID] ?? Network.Goerli;
}

export function resolveProviderConfiguration(): ProviderConfig {
  const defaults = defaultProviderConfiguration[voyageEnvironment()];
  const chainId = resolveChainId(defaults.chainId);
  const name = resolveNetwork(chainId);
  return {
    ...defaults,
    name,
    chainId,
    endpoint: resolveNodeUrl(defaults.endpoint),
  };
}

export const getTxExplorerLink = (hash: string) => {
  const { explorer: explorerUrl } = resolveProviderConfiguration();
  return `${explorerUrl}tx/${hash}`;
};

export const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID || '';
