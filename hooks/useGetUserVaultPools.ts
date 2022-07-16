import { useQuery } from '@apollo/client';
import { GET_USER_VAULT_POOLS } from '@graph/queries/user';
import { VaultData } from 'types';
import { rayToPercent, shiftDecimals } from 'utils/bn';
import { useAccount } from 'wagmi';

export const useGetUserVaultPools = () => {
  const account = useAccount();
  const accountAddress = account.data?.address?.toLowerCase();

  const { loading, data, error, refetch } = useQuery(GET_USER_VAULT_POOLS, {
    variables: {
      address: accountAddress,
    },
    notifyOnNetworkStatusChange: true,
  });
  return {
    data: data ? resultToVaults(data) : [],
    loading,
    error,
    refetch,
  };
};

const resultToVaults = (res: any): VaultData[] => {
  const vaults = res.userData ? res.userData.vaults : [];

  return vaults.map((vault: any) => {
    const decimals = vault.pool ? Number(vault.pool.decimals) : 0;
    return {
      id: vault.id,
      symbol: vault.pool?.symbol || '',
      assetAddress: vault.pool?.id || '',
      decimals,
      borrowRate: shiftDecimals(vault.borrowRate, decimals),
      totalDebt: shiftDecimals(vault.totalDebt, decimals),
      totalMargin: shiftDecimals(vault.totalMargin, decimals),
      withdrawableSecurityDeposit: shiftDecimals(
        vault.withdrawableSecurityDeposit,
        decimals
      ),
      creditLimit: shiftDecimals(vault.creditLimit, decimals),
      spendableBalance: shiftDecimals(vault.spendableBalance, decimals),
      gav: Number(vault.gav),
      ltv: Number(vault.ltv),
      healthFactor: Number(vault.healthFactor),
      marginRequirement: rayToPercent(vault.marginRequirement),
      drawdowns: vault.drawdowns.map((drawdown: any) => ({
        id: drawdown.id,
        pmt_interest: shiftDecimals(drawdown.pmt_interest, decimals),
        pmt_principal: shiftDecimals(drawdown.pmt_principal, decimals),
        pmt_payment: shiftDecimals(drawdown.pmt_payment, decimals),
        principal: shiftDecimals(drawdown.principal, decimals),
        term: Number(drawdown.term),
        epoch: Number(drawdown.epoch),
        nper: Number(drawdown.nper),
        apr: shiftDecimals(drawdown.apr, decimals),
        borrowAt: Number(drawdown.borrowAt),
        nextPaymentDue: Number(drawdown.nextPaymentDue),
        totalPrincipalPaid: shiftDecimals(
          drawdown.totalPrincipalPaid,
          decimals
        ),
        totalInterestPaid: shiftDecimals(drawdown.totalInterestPaid, decimals),
        paidTimes: Number(drawdown.paidTimes),
      })),
    };
  });
};
