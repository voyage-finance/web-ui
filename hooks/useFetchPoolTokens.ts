import { useContractRead } from 'wagmi';
import { VoyagePoolTokenMap } from '../types';
import * as React from 'react';
import { VoyageCtx } from '@components/base/VoyageProvider';
import { VoyageContracts } from '../consts/addresses';
import { useGetDeployment } from './useGetDeployment';

export const useFetchPoolTokens = () => {
  const { address, abi } = useGetDeployment(
    VoyageContracts.VoyageProtocolDataProvider
  );
  const { data: tokens } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'getPoolTokens'
  );

  return Object.fromEntries(tokens || []) as VoyagePoolTokenMap;
};

export const useSupportedTokens = () => {
  const { tokens } = React.useContext(VoyageCtx);
  return [tokens] as const;
};
