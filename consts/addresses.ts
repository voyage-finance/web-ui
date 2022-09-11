import { ChainID, Network } from '../utils/env';

import VoyageABI from '../abi/Voyage.json';

export enum VoyageContracts {
  Voyage,
}

export const Deployments: Record<
  ChainID,
  Record<VoyageContracts, Deployment>
> = {
  [ChainID.Hardhat]: {
    [VoyageContracts.Voyage]: {
      network: Network.Hardhat,
      abi: VoyageABI,
      address: '0xF62e0575e562B84610587828Cd51278D38C39e6F',
    },
  },
  [ChainID.Goerli]: {
    [VoyageContracts.Voyage]: {
      network: Network.Goerli,
      abi: VoyageABI,
      address: '0x4aFb3904e9f0615Aa15eb3208484BdcE7595bb79',
    },
  },
  [ChainID.Mainnet]: {
    [VoyageContracts.Voyage]: {
      network: Network.Mainnet,
      abi: VoyageABI,
      address: '',
    },
  },
};

export interface Deployment {
  network: Network;
  address: string;
  abi: any;
}
