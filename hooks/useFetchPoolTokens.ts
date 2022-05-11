import { useContractRead } from 'wagmi';
import { VOYAGE_DATA_PROVIDER_ADDRESS } from '../abi/addresses';
import VoyageProtocolDataProviderAbi from '../abi/VoyageProtocolDataProvider.json';
import { VoyagePoolTokenMap } from '../types';
import * as React from 'react';
import { VoyageCtx } from '@components/base/VoyageProvider';

export const useFetchPoolTokens = () => {
  const { data: tokens } = useContractRead(
    {
      addressOrName: VOYAGE_DATA_PROVIDER_ADDRESS,
      contractInterface: VoyageProtocolDataProviderAbi,
    },
    'getPoolTokens'
  );

  return Object.fromEntries(tokens || []) as VoyagePoolTokenMap;
};

export const useSupportedTokens = () => {
  const { tokens } = React.useContext(VoyageCtx);
  return [tokens] as const;
};
