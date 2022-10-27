import VoyageABI from '@abi/Voyage';
import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { DEFAULT_RESERVE_STATE } from '@hooks/useReserve';
import { Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TrancheTextMap, TrancheType } from '@types';
import { formatPercent, normalize, rayToPercent, Zero } from '@utils/bn';
import c from '@utils/config';
import { isRpcError } from '@utils/error';
import { showNotification } from '@utils/notification';
import { usdValue } from '@utils/price';
import { getExplorerLink } from '@utils/transaction';
import { ReserveAssets } from 'consts';
import { errorCodes } from 'eth-rpc-errors';
import { ethers } from 'ethers';
import { useAssetPrice, useGetUserErc20Balance, useReserve } from 'hooks';
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

type IProps = {
  collection: Address;
  tranche: TrancheType;
  onDeposited: (amount: string) => void;
  onError: (message: string) => void;
};

const EnterAmountStep: React.FC<IProps> = ({
  collection,
  tranche,
  onDeposited,
  onError,
}) => {
  const { address } = useAccount();
  const [priceData] = useAssetPrice(ReserveAssets.ETH);
  const { data: reserve = DEFAULT_RESERVE_STATE, isLoading } = useReserve(
    collection,
    address
  );
  const { data: userWethBalance } = useGetUserErc20Balance(c.wethAddress);
  const APY = reserve
    ? tranche == TrancheType.Senior
      ? reserve.seniorTrancheDepositRate
      : reserve.juniorTrancheDepositRate
    : Zero;
  const totalDeposit = reserve
    ? tranche == TrancheType.Senior
      ? reserve.seniorTrancheLiquidity
      : reserve.juniorTrancheLiquidity
    : Zero;
  const balance = reserve.userDepositData
    ? tranche === TrancheType.Junior
      ? reserve.userDepositData.junior.assets
      : reserve.userDepositData.senior.assets
    : Zero;
  const form = useForm({
    initialValues: { amount: '' },
    validateInputOnChange: true,
    validate: {
      amount: (value) => {
        const num = ethers.utils.parseEther(value || '0');
        if (num.eq(0)) {
          return 'Enter an amount';
        }

        if (num.lte(0)) {
          return 'Amount should be a positive number';
        }

        if (!userWethBalance || num.gt(userWethBalance)) {
          return 'Insufficient balance!';
        }

        return null;
      },
    },
  });
  const amount = ethers.utils.parseEther(form.values.amount || '0');

  const { config, isError: isPrepareError } = usePrepareContractWrite({
    address: c.voyageAddress,
    abi: VoyageABI,
    functionName: 'deposit',
    args: [collection as Address, tranche, amount],
    enabled: !isLoading && form.isValid(),
  });
  const {
    data,
    isError: isWriteError,
    isLoading: isWriting,
    write: deposit,
  } = useContractWrite({
    ...config,
    onSuccess(tx) {
      showNotification({
        title: 'Deposit Pending',
        message: `Depositing ${form.values.amount} ${reserve.currency.symbol}...`,
        type: 'success',
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
      onError(error.message);
    },
  });
  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 2,
    onSuccess(receipt) {
      showNotification({
        type: 'success',
        title: 'Deposit success',
        message: `Deposited ${form.values.amount} ${reserve.currency.symbol} successfully.`,
        link: getExplorerLink(receipt.transactionHash),
      });
      onDeposited(amount.toString());
    },
  });

  const onDeposit = async () => {
    deposit?.();
  };

  return (
    <form onSubmit={form.onSubmit(onDeposit)}>
      <Group position="apart" mt={16} align="start">
        <Stack spacing={0}>
          <Text type="secondary">
            <strong>{TrancheTextMap[tranche]}</strong> APY
          </Text>
          <Title order={4}>{formatPercent(rayToPercent(APY))}</Title>
        </Stack>
        <Stack spacing={0} align={'end'}>
          <Text type="secondary">
            <strong>{TrancheTextMap[tranche]}</strong> Tranche Liquidity
          </Text>
          <Title order={4}>
            {normalize(totalDeposit, reserve.currency.decimals)}{' '}
            <Text span inherit type="accent">
              {reserve.currency.symbol}
            </Text>
          </Title>
          <Text size="sm">{`~${usdValue(
            totalDeposit || Zero,
            priceData.latestPrice
          )}`}</Text>
        </Stack>
      </Group>
      <Divider my={16} orientation="horizontal" />
      <Group position="apart">
        <Text type="secondary">Your Current Total Deposit</Text>
        <Stack spacing={0} align="end">
          <Title order={5}>
            {normalize(balance, reserve.currency.decimals)}{' '}
            <Text weight={400} span>
              {reserve?.currency.symbol}
            </Text>
          </Title>
          <Text type="secondary">{`~${usdValue(
            balance || Zero,
            priceData.latestPrice
          )}`}</Text>
        </Stack>
      </Group>
      <Group position="apart" mt={16}>
        <Text type="secondary">To Deposit</Text>
        <Text type="secondary" size="xs">
          {'Balance: '}
          <Text underline span type="secondary" size="xs" weight={700}>
            {`${normalize(
              userWethBalance?.toString() ?? '0',
              reserve.currency.decimals
            )} ${reserve.currency.symbol}`}
          </Text>{' '}
        </Text>
      </Group>
      <AmountInput
        mt={16}
        address={c.wethAddress}
        {...form.getInputProps('amount')}
      />
      <Button
        fullWidth
        mt={16}
        loading={isLoading || isWriting || isConfirming}
        type="submit"
        disabled={
          !form.isValid() || isWriteError || isPrepareError || isConfirming
        }
      >
        {form.isValid()
          ? isConfirming || isWriting
            ? 'Processing transaction'
            : 'Confirm deposit'
          : form.errors.amount || 'Enter an amount'}
      </Button>
    </form>
  );
};

export default EnterAmountStep;
