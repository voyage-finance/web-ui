import { ChainID, Network } from '../utils/env';

import Voyager from '../abi/Voyager.json';

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
      abi: Voyager,
      address: '0xF62e0575e562B84610587828Cd51278D38C39e6F',
    },
  },
  [ChainID.Staging]: {
    [VoyageContracts.Voyager]: {
      network: Network.Voyage,
      abi: Voyager,
      address: '0xF62e0575e562B84610587828Cd51278D38C39e6F',
    },
  },
  [ChainID.Fuji]: {
    [VoyageContracts.Voyager]: {
      network: Network.Fuji,
      abi: Voyager,
      address: '0xF62e0575e562B84610587828Cd51278D38C39e6F',
    },
  },
  // TODO: after mainnet deployment
  [ChainID.Avalanche]: {
    [VoyageContracts.Voyager]: {
      network: Network.Avalanche,
      abi: Voyager,
      address: '',
    },
  },
};

export interface Deployment {
  network: Network;
  address: string;
  abi: any;
}
