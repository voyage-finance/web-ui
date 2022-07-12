import { ChainID, Network } from '../utils/env';

import Voyage from '../abi/Voyage.json';

export enum VoyageContracts {
  Voyager,
}

export const Deployments: Record<
  ChainID,
  Record<VoyageContracts, Deployment>
> = {
  [ChainID.Hardhat]: {
    [VoyageContracts.Voyager]: {
      network: Network.Hardhat,
      abi: Voyage,
      address: '0xF62e0575e562B84610587828Cd51278D38C39e6F',
    },
  },
  [ChainID.Fuji]: {
    [VoyageContracts.Voyager]: {
      network: Network.Fuji,
      abi: Voyage,
      address: '0x4Dea4A295581a2A7C3347684137A92924348E127',
    },
  },
  // TODO: after mainnet deployment
  [ChainID.Avalanche]: {
    [VoyageContracts.Voyager]: {
      network: Network.Avalanche,
      abi: Voyage,
      address: '',
    },
  },
};

export interface Deployment {
  network: Network;
  address: string;
  abi: any;
}
