import {
  VOYAGE_DATA_PROVIDER_ADDRESS,
  VOYAGE_LM_IMPL_ADDRESS,
} from 'abi/addresses';
import * as React from 'react';
import VoyageProtocolDataProviderAbi from 'abi/VoyageProtocolDataProvider.json';
import TusAbi from 'abi/Token.json';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { useSupportedTokens } from '../hooks/useFetchPoolTokens';

export const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
};

export const useGetPoolData = (tokenSmb: string) => {
  const [tokens] = useSupportedTokens();
  return useContractRead(
    {
      addressOrName: VOYAGE_DATA_PROVIDER_ADDRESS,
      contractInterface: VoyageProtocolDataProviderAbi,
    },
    'getPoolData',
    {
      args: tokens[tokenSmb],
    }
  );
};

export const useGetAllowance = (tokenSmb: string) => {
  const account = useAccount();
  const [tokens] = useSupportedTokens();
  return useContractRead(
    {
      addressOrName: tokens[tokenSmb],
      contractInterface: TusAbi,
    },
    'allowance',
    {
      args: [account.data?.address, VOYAGE_LM_IMPL_ADDRESS],
    }
  );
};

export const useIncreaseAllowance = (tokenSmb: string) => {
  const [tokens] = useSupportedTokens();
  return useContractWrite(
    {
      addressOrName: tokens[tokenSmb],
      contractInterface: TusAbi,
    },
    'increaseAllowance'
  );
};
