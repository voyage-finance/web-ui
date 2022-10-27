import { ChainID } from '@types';

export const MAX_UINT_AMOUNT =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export enum ReserveAssets {
  ETH = 'eth',
}

export const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Assets IDs are necessary for fetching price data from the coingecko API.
// The full list can be accessed at https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit#gid=0
// Newly supported game assets should be added here.
export const COINGECKO_ASSET_MAP: Record<ReserveAssets, string> = {
  [ReserveAssets.ETH]: 'ethereum',
};

export enum VoyageContracts {
  Voyage,
}

export const VOYAGE_ADDRESS: Record<ChainID, string> = {
  [ChainID.Mainnet]: '0xbaf6fd0b5d060899afe7d0717ee65d80fe6911f5',
  [ChainID.Goerli]: '0x4afb3904e9f0615aa15eb3208484bdce7595bb79',
  [ChainID.Hardhat]: '0x4afb3904e9f0615aa15eb3208484bdce7595bb79',
};

export const WETH_ADDRESS: Record<ChainID, string> = {
  [ChainID.Mainnet]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [ChainID.Goerli]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  [ChainID.Hardhat]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
};
