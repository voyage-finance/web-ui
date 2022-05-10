import {
  VOYAGE_DATA_PROVIDER_ADDRESS,
  VOYAGE_LM_IMPL_ADDRESS,
} from 'abi/addresses';
import * as React from 'react';
import VoyageProtocolDataProviderAbi from 'abi/VoyageProtocolDataProvider.json';
import TusAbi from 'abi/Token.json';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';

export const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
};

export const useGetPoolData = (tokenSmb: string) =>
  useContractRead(
    {
      addressOrName: VOYAGE_DATA_PROVIDER_ADDRESS,
      contractInterface: VoyageProtocolDataProviderAbi,
    },
    'getPoolData',
    {
      args: getTokenAddress(tokenSmb),
    }
  );

export const useFetchPoolTokens = () => {
  const { data: tokens } = useContractRead(
    {
      addressOrName: VOYAGE_DATA_PROVIDER_ADDRESS,
      contractInterface: VoyageProtocolDataProviderAbi,
    },
    'getPoolTokens'
  );
  React.useEffect(() => {
    if (tokens) {
      let tokenAddressMap: { [key: string]: string } = {};
      tokens.forEach((token) => {
        tokenAddressMap[token[0]] = token[1];
      });
      localStorage.setItem('tokens', JSON.stringify(tokenAddressMap));
    }
  }, [tokens]);
};

const getTokenAddress = (tokenSmb: string) => {
  const tokens: { [key: string]: string } = JSON.parse(
    localStorage.getItem('tokens') || '{}'
  );
  return tokens[tokenSmb];
};

export const useGetAllowance = (tokenSmb: string) => {
  const account = useAccount();
  return useContractRead(
    {
      addressOrName: getTokenAddress(tokenSmb),
      contractInterface: TusAbi,
    },
    'allowance',
    {
      args: [account.data?.address, VOYAGE_LM_IMPL_ADDRESS],
    }
  );
};

export const useIncreaseAllowance = (tokenSmb: string) =>
  useContractWrite(
    {
      addressOrName: getTokenAddress(tokenSmb),
      contractInterface: TusAbi,
    },
    'increaseAllowance'
  );
