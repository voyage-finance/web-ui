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
      address: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Hardhat,
      abi: VoyageProtocolDataProvider,
      address: '0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf',
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
      address: '0xFa075Bc7A07F2F817bFff8AA81425b39572b1cC8',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Fuji,
      abi: LiquidityManager,
      address: '0xae8b7B6bc3451Cd8f5e4C05d9Db693FFFFd26CD9',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Fuji,
      abi: VoyageProtocolDataProvider,
      address: '0x6b46273033293BFd550312DdfD263A683a2975De',
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
