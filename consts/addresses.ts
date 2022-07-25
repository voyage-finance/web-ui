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
  [ChainID.Rinkeby]: {
    [VoyageContracts.Voyager]: {
      network: Network.Rinkeby,
      abi: Voyage,
      address: '0xE273C1D2716374391A9B12d4066215CaAc26beC5',
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
