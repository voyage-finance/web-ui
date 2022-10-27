import { TrancheType } from '@types';
import { useAccount, useContractRead } from 'wagmi';
import { DEFAULT_RESERVE_STATE, useReserve } from './useReserve';
import VTokenABI from '@abi/VToken';
import { ethers } from 'ethers';

/**
 * Returns the assets that can be withdrawn by the currently connected user
 * @param collection - the address of the collection
 * @param tranche - tranche
 */
export const useWithdrawable = (collection: string, tranche: TrancheType) => {
  const { address: user } = useAccount();
  const {
    data: reserve = DEFAULT_RESERVE_STATE,
    isLoading: isReserveLoading,
    isError: isFetchReserveError,
    refetch: refetchReserve,
  } = useReserve(collection, user);
  const vToken =
    tranche === TrancheType.Junior
      ? reserve.juniorTrancheVToken.id
      : reserve.seniorTrancheVToken.id;
  const {
    data,
    isLoading: isBalanceLoading,
    isError: isFetchBalanceError,
    refetch: refetchVToken,
    ...vTokenQuery
  } = useContractRead({
    address: vToken,
    abi: VTokenABI,
    functionName: 'maxWithdraw',
    args: [user ?? ethers.constants.AddressZero],
  });
  const refetch = async () => {
    await refetchReserve();
    await refetchVToken();
  };
  const isLoading = isReserveLoading || isBalanceLoading;
  const isError = isFetchReserveError || isFetchBalanceError;
  return { ...vTokenQuery, data, isLoading, isError, refetch };
};
