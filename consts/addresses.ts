import { ChainID, Network } from '../utils/env';

import Voyager from '../abi/Voyager.json';
import LiquidityManager from '../abi/LiquidityManager.json';
import VoyageProtocolDataProvider from '../abi/VoyageProtocolDataProvider.json';

export enum VoyageContracts {
  VoyageProtocolDataProvider,
  LiquidityManager,
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
      address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Hardhat,
      abi: LiquidityManager,
      address: '0x9A676e781A523b5d0C0e43731313A708CB607508',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Hardhat,
      abi: VoyageProtocolDataProvider,
      address: '0x0E801D84Fa97b50751Dbf25036d067dCf18858bF',
    },
  },
  [ChainID.Staging]: {
    [VoyageContracts.Voyager]: {
      network: Network.Voyage,
      abi: Voyager,
      address: '0x13F1B8d31d9AA211CDC0ee0f848eac1e2Be8aED2',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Voyage,
      abi: LiquidityManager,
      address: '0x7b802645d6Dc23ffaB50001B9487da16466c52c4',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Voyage,
      abi: VoyageProtocolDataProvider,
      address: '0x9A1F956D4A8a993784B2F67315a5d8613e4165e8',
    },
  },
  [ChainID.Fuji]: {
    [VoyageContracts.Voyager]: {
      network: Network.Fuji,
      abi: Voyager,
      address: '0x5a2610e2739c3a50A0050625f04A20C4cE704eCb',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Fuji,
      abi: LiquidityManager,
      address: '0xBf2C962Bb656e1E1eED98762bCafFd6480bf77fe',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Fuji,
      abi: VoyageProtocolDataProvider,
      address: '0x0d5BBF197cBaE01072850603C2Db14Eb152a8B2a',
    },
  },
  // TODO: after mainnet deployment
  [ChainID.Avalanche]: {
    [VoyageContracts.Voyager]: {
      network: Network.Avalanche,
      abi: Voyager,
      address: '',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Avalanche,
      abi: LiquidityManager,
      address: '',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Avalanche,
      abi: VoyageProtocolDataProvider,
      address: '',
    },
  },
};

export interface Deployment {
  network: Network;
  address: string;
  abi: any;
}
