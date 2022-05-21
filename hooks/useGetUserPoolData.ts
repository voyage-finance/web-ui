import { useAccount } from 'wagmi';
import { useSupportedTokens } from './useFetchPoolTokens';
import { UserPoolData } from 'types';
import { shiftDecimals } from 'utils/bn';
import { VoyageContracts } from '../consts/addresses';
import { useGetDeployment } from './useGetDeployment';
import { useContractRead } from 'hooks';

export const useGetUserPoolData = (tokenSmb: string) => {
  const [tokens] = useSupportedTokens();
  const account = useAccount();
  const { address, abi } = useGetDeployment(
    VoyageContracts.VoyageProtocolDataProvider
  );
  const { data, ...rest } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
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
