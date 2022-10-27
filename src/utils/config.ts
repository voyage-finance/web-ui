import { ChainID, Network } from '@types';
import { VOYAGE_ADDRESS, WETH_ADDRESS } from 'consts';

export const CHAIN_ID_NETWORK: Record<ChainID, Network> = {
  [ChainID.Mainnet]: Network.Mainnet,
  [ChainID.Goerli]: Network.Goerli,
  [ChainID.Hardhat]: Network.Hardhat,
};

export const chainId: ChainID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10);

export const network: Network = CHAIN_ID_NETWORK[chainId];

export const explorerUrl: string = process.env.NEXT_PUBLIC_EXPLORER_URL;

export const extensionId = process.env.NEXT_PUBLIC_EXTENSION_ID || '';

export const voyageAddress = VOYAGE_ADDRESS[chainId];
export const wethAddress = WETH_ADDRESS[chainId];

const config = {
  chainId,
  network,
  explorerUrl,
  extensionId,
  voyageAddress,
  wethAddress,
};

export default config;
