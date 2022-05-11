import { VOYAGE_DATA_PROVIDER_ADDRESS } from 'abi/addresses';
import { useAccount, useContractRead } from 'wagmi';
import { useSupportedTokens } from './useFetchPoolTokens';
import VoyageProtocolDataProviderAbi from 'abi/VoyageProtocolDataProvider.json';
import { UserPoolData } from 'types';
import { shiftDecimals } from 'utils/bn';

export const useGetUserPoolData = (tokenSmb: string) => {
  const [tokens] = useSupportedTokens();
  const account = useAccount();
  const { data, ...rest } = useContractRead(
    {
      addressOrName: VOYAGE_DATA_PROVIDER_ADDRESS,
      contractInterface: VoyageProtocolDataProviderAbi,
    },
    'getUserPoolData',
    {
      args: [tokens[tokenSmb], account.data?.address],
    }
  );
  const userPoolData = rest.isSuccess ? resultToUserPoolData(data) : undefined;

  return { data: userPoolData, ...rest };
};

const resultToUserPoolData = (res: any): UserPoolData => {
  const decimals = res[4].toNumber();
  return {
    juniorTrancheBalance: shiftDecimals(res[0], decimals),
    withdrawableJuniorTrancheBalance: shiftDecimals(res[1], decimals),
    seniorTrancheBalance: shiftDecimals(res[2], decimals),
    withdrawableSeniorTrancheBalance: shiftDecimals(res[3], decimals),
  };
};
