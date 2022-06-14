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
      address: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Hardhat,
      abi: LiquidityManager,
      address: '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Hardhat,
      abi: VoyageProtocolDataProvider,
      address: '0x809d550fca64d94Bd9F66E60752A544199cfAC3D',
    },
  },
  [ChainID.Staging]: {
    [VoyageContracts.Voyager]: {
      network: Network.Voyage,
      abi: Voyager,
      address: '0x37Cd9dDf18Eab2cc734Efe9dd853CE23215E9dfE',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Voyage,
      abi: LiquidityManager,
      address: '0x6528fd2d0d84BB758ccc47d98B716cCb12c0dfB4',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Voyage,
      abi: VoyageProtocolDataProvider,
      address: '0x88Ad3d5A82A2401EEDFd938E7d0f0134e3c91EBF',
    },
  },
  [ChainID.Fuji]: {
    [VoyageContracts.Voyager]: {
      network: Network.Fuji,
      abi: Voyager,
      address: '0x293540a1A293B3adcb2EEA7d8249cF392475e665',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Fuji,
      abi: LiquidityManager,
      address: '0x13aA52A79b16021107A0031Ae2c672A561F52287',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Fuji,
      abi: VoyageProtocolDataProvider,
      address: '0x41D4D41Ae35a5815a77B437932B722e85B6dD453',
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
