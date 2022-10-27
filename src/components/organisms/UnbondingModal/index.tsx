import SeniorDepositTokenABI from '@abi/SeniorDepositToken';
import { Button, Modal, Text } from '@components/base';
import { DEFAULT_RESERVE_STATE, useReserve } from '@hooks/useReserve';
import { useWethBalance } from '@hooks/useWethBalance';
import { Group, LoadingOverlay, ModalProps, Stack } from '@mantine/core';
import { normalize, Zero } from '@utils/bn';
import { isRpcError } from '@utils/error';
import { showNotification } from '@utils/notification';
import { getExplorerLink } from '@utils/transaction';
import { convertToAssets } from '@utils/vtoken';
import BigNumber from 'bignumber.js';
import { errorCodes } from 'eth-rpc-errors';
import { ethers } from 'ethers';
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

type IProps = ModalProps & {
  collection: string;
  opened: boolean;
  onClose: () => void;
};

const UnbondingModal: React.FC<IProps> = ({
  collection,
  onClose,
  ...props
}) => {
  const { address } = useAccount();
  const {
    data: reserve = DEFAULT_RESERVE_STATE,
    isLoading: isLoadingReserve,
    refetch,
  } = useReserve(collection, address);
  const { data: availableAssets, isLoading: isLoadingAvailableAssets } =
    useWethBalance(reserve.seniorTrancheVToken.id);

  const currentUnbonding = BigNumber.min(
    convertToAssets(
      reserve.userUnbondingData.shares,
      reserve.seniorTrancheVToken.totalShares,
      reserve.seniorTrancheVToken.totalAssets
    ),
    reserve.userUnbondingData.maxUnderlying
  );
  const { config } = usePrepareContractWrite({
    address: reserve.seniorTrancheVToken.id as Address,
    abi: SeniorDepositTokenABI,
    functionName: 'claim',
    enabled: !isLoadingReserve && !isLoadingAvailableAssets,
  });
  const {
    data,
    write: claim,
    isLoading: isWriting,
  } = useContractWrite({
    ...config,
    onSuccess(tx) {
      showNotification({
        title: 'Claim pending',
        message: `Claiming...`,
        type: 'info',
        link: getExplorerLink(tx.hash),
      });
    },
    onError(error) {
      if (
        isRpcError(error) &&
        (error.code === errorCodes.provider.userRejectedRequest ||
          error.code === ethers.errors.ACTION_REJECTED)
      ) {
        return;
      }
      showNotification({
        title: 'Deposit Failed',
        message: error.message,
        type: 'error',
      });
    },
  });
  const { isSuccess, isLoading: isConfirming } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 2,
    onSuccess: async function (data) {
      showNotification({
        title: 'Success',
        message: `Successfully claimed!`,
        type: 'info',
        link: getExplorerLink(data.transactionHash),
      });
      await refetch();
      onClose();
    },
  });

  const handleClaim = async () => {
    claim?.();
  };

  return (
    <Modal
      title={`Claim unbonding assets`}
      centered
      onClose={onClose}
      {...props}
    >
      <LoadingOverlay visible={isLoadingReserve} />
      {isSuccess && <Text>You have successfully claimed.</Text>}
      <Stack py={16}>
        <Text>
          {`WETH available to claim: ${normalize(
            availableAssets?.toString() ?? Zero,
            reserve.currency.decimals
          )} WETH`}
        </Text>
        <Text>
          {`Your unbonding position: ${normalize(
            currentUnbonding,
            reserve.currency.decimals
          )} WETH`}
        </Text>
        <Text>
          {`You are about to reduce your unbonding position by ${normalize(
            BigNumber.min(
              availableAssets?.toString() ?? Zero,
              currentUnbonding
            ),
            reserve.currency.decimals
          )} WETH.`}
        </Text>
        <Text>
          This operation is <strong>irreversible</strong>.
        </Text>
      </Stack>
      <Group mt={8} align="center" position="right">
        <Button
          onClick={handleClaim}
          loading={
            isLoadingReserve ||
            isLoadingAvailableAssets ||
            isWriting ||
            isConfirming
          }
          disabled={
            !claim ||
            availableAssets?.isZero() ||
            isLoadingAvailableAssets ||
            isLoadingReserve ||
            isConfirming
          }
        >
          Confirm
        </Button>
      </Group>
    </Modal>
  );
};

export default UnbondingModal;
