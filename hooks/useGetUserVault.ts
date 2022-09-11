import { useQuery } from '@apollo/client';
import { GET_USER_VAULT } from '@graph/queries/user';
import { Vault } from 'types';
import { rayToPercent, shiftDecimals } from 'utils/bn';
import { useAccount } from 'wagmi';

export const useGetUserVault = () => {
  const account = useAccount();
  const accountAddress = account.address?.toLowerCase();

  const { loading, data, error, refetch } = useQuery(GET_USER_VAULT, {
    variables: {
      address: accountAddress,
    },
    notifyOnNetworkStatusChange: true,
  });

  return {
    data: data ? resultToVault(data) : null,
    loading,
    error,
    refetch,
  };
};

const resultToVault = (res: any): Vault => {
  const vault = res.userData?.vault;

  const creditLines = vault
    ? vault.creditLines.map((creditLine: any) => {
        const decimals = creditLine.pool ? Number(creditLine.pool.decimals) : 0;
        return {
          id: creditLine.id,
          symbol: creditLine.pool?.symbol || '',
          assetAddress: creditLine.pool?.id || '',
          decimals,
          borrowRate: shiftDecimals(creditLine.borrowRate, decimals),
          totalDebt: shiftDecimals(creditLine.totalDebt, decimals),
          totalMargin: shiftDecimals(creditLine.totalMargin, decimals),
          withdrawableSecurityDeposit: shiftDecimals(
            creditLine.withdrawableSecurityDeposit,
            decimals
          ),
          creditLimit: shiftDecimals(creditLine.creditLimit, decimals),
          spendableBalance: shiftDecimals(
            creditLine.spendableBalance,
            decimals
          ),
          gav: Number(creditLine.gav),
          ltv: Number(creditLine.ltv),
          healthFactor: Number(creditLine.healthFactor),
          marginRequirement: rayToPercent(creditLine.marginRequirement),
        };
      })
    : [];

  const loans = vault
    ? vault.loans.map((loan: any) => {
        const decimals = loan.pool ? Number(loan.pool.decimals) : 0;
        return {
          id: loan.id,
          pmt_interest: shiftDecimals(loan.pmt_interest, decimals),
          pmt_principal: shiftDecimals(loan.pmt_principal, decimals),
          pmt_payment: shiftDecimals(loan.pmt_payment, decimals),
          principal: shiftDecimals(loan.principal, decimals),
          term: Number(loan.term),
          epoch: Number(loan.epoch),
          nper: Number(loan.nper),
          apr: shiftDecimals(loan.apr, decimals),
          borrowAt: Number(loan.borrowAt),
          nextPaymentDue: Number(loan.nextPaymentDue),
          totalPrincipalPaid: shiftDecimals(loan.totalPrincipalPaid, decimals),
          totalInterestPaid: shiftDecimals(loan.totalInterestPaid, decimals),
          paidTimes: Number(loan.paidTimes),
        };
      })
    : [];

  return {
    id: vault.id,
    creditLines,
    loans,
  };
};
