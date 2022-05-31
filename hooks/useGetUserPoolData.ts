import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '@graph/queries/user';
import { UserPoolData } from 'types';
import { shiftDecimals, Zero } from 'utils/bn';
import { useAccount } from 'wagmi';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';

export const useGetUserPoolData = (tokenSmb: string) => {
  const [tokens] = useSupportedTokensCtx();
  const account = useAccount();

  const { loading, data, error, refetch } = useQuery(GET_USER_DATA, {
    variables: {
      underlyingAsset: tokens[tokenSmb],
      address: account.data?.address,
    },
    notifyOnNetworkStatusChange: true,
  });
  return {
    data: data ? resultToUserPoolData(data) : undefined,
    loading,
    error,
    refetch,
  };
};

const resultToUserPoolData = (res: any): UserPoolData => {
  const poolData = res.user.poolData[0];
  const decimals = Number(poolData.decimals);
  return {
    juniorTrancheBalance: shiftDecimals(
      poolData.juniorTrancheBalance,
      decimals
    ),
    seniorTrancheBalance: shiftDecimals(
      poolData.seniorTrancheBalance,
      decimals
    ),
    // TODO: update when indexer will return this fields
    withdrawableJuniorTrancheBalance: Zero,
    withdrawableSeniorTrancheBalance: Zero,
  };
};
