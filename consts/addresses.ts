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
      address: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
    },
  },
  [ChainID.Staging]: {
    [VoyageContracts.Voyager]: {
      network: Network.Voyage,
      abi: Voyager,
      address: '0x37Cd9dDf18Eab2cc734Efe9dd853CE23215E9dfE',
    },
  },
  [ChainID.Fuji]: {
    [VoyageContracts.Voyager]: {
      network: Network.Fuji,
      abi: Voyager,
      address: '0xed4B20ed8f97a23F5770225aA30C322CCda060E8',
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
