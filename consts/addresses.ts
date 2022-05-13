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
      address: '0x4231030727A637eD5fBe180D1e4fa23EE2DA6400',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Voyage,
      abi: LiquidityManager,
      address: '0xf69F09e7138fdA58fcb3F9A95e67A8c9B0a8C025',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Voyage,
      abi: VoyageProtocolDataProvider,
      address: '0x89e3CFB42df3B932C8e07884EEA1Ca1D1CEf67c6',
    },
  },
  [ChainID.Fuji]: {
    [VoyageContracts.Voyager]: {
      network: Network.Fuji,
      abi: Voyager,
      address: '0xc884c877599A8857819e2e56Cde9feC86abbD5Cb',
    },
    [VoyageContracts.LiquidityManager]: {
      network: Network.Fuji,
      abi: LiquidityManager,
      address: '0x86898a89e50bae21c0dF62b1420e9103a4D6D29b',
    },
    [VoyageContracts.VoyageProtocolDataProvider]: {
      network: Network.Fuji,
      abi: VoyageProtocolDataProvider,
      address: '0xb866fce6d08c8D80a73a228D39C9ebb2d8a56FE6',
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
