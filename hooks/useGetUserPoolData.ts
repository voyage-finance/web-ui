import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '@graph/queries/user';
import BigNumber from 'bignumber.js';
import { TrancheType, UserPoolData } from 'types';
import { shiftDecimals, Zero } from 'utils/bn';
import { useAccount } from 'wagmi';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';

export const useGetUserPoolData = (tokenSmb: string) => {
  const [tokens] = useSupportedTokensCtx();
  const account = useAccount();
  const accountAddress = account.data?.address?.toLowerCase();

  const { loading, data, error, refetch } = useQuery(GET_USER_DATA, {
    variables: {
      depositDataAddress: `${accountAddress}_${tokens[tokenSmb]}`,
      address: accountAddress,
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
  const poolData = res.userData?.depositData
    ? res.userData.depositData[0]
    : null;

  const unbondings = res.userData?.unbondings || [];
  const decimals = poolData ? Number(poolData.decimals) : 0;
  return {
    juniorTrancheBalance: poolData?.juniorTrancheBalance
      ? shiftDecimals(poolData.juniorTrancheBalance, decimals)
      : Zero,
    seniorTrancheBalance: poolData?.seniorTrancheBalance
      ? shiftDecimals(poolData.seniorTrancheBalance, decimals)
      : Zero,
    unbondings: unbondings.map((v: any) => ({
      amount: shiftDecimals(v.amount, decimals),
      time: new BigNumber(v.time),
      type: v.type === 'Senior' ? TrancheType.Senior : TrancheType.Junior,
    })),
    withdrawableJuniorBalance: poolData
      ? shiftDecimals(poolData.withdrawableJuniorBalance, decimals)
      : Zero,
    withdrawableSeniorBalance: poolData
      ? shiftDecimals(poolData.withdrawableSeniorBalance, decimals)
      : Zero,
    juniorTranchePnl: poolData?.juniorTranchePnl
      ? shiftDecimals(poolData.juniorTranchePnl, Number(decimals))
      : Zero,
    seniorTranchePnl: poolData?.juniorTranchePnl
      ? shiftDecimals(poolData.seniorTranchePnl, Number(decimals))
      : Zero,
  };
};
