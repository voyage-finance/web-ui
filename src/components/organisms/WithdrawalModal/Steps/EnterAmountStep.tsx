import VTokenABI from '@abi/VToken';
import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { useWithdrawable } from '@hooks/useWithdrawable';
import { Box, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Reserve, TrancheType } from '@types';
import { normalize, Zero } from '@utils/bn';
import { isRpcError } from '@utils/error';
import { showNotification } from '@utils/notification';
import { usdValue } from '@utils/price';
import { getExplorerLink } from '@utils/transaction';
import DangerImg from 'assets/danger.png';
import { ReserveAssets } from 'consts';
import { errorCodes } from 'eth-rpc-errors';
import { ethers } from 'ethers';
import { useAssetPrice } from 'hooks';
import Image from 'next/image';
import { useState } from 'react';
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

type IProps = {
  reserve: Reserve;
  tranche: TrancheType;
  onSuccess: (receipt: ethers.providers.TransactionReceipt) => void;
};

const EnterAmountStep: React.FC<IProps> = ({ reserve, tranche, onSuccess }) => {
  const [priceData] = useAssetPrice(ReserveAssets.ETH);
  const { data: withdrawable = ethers.constants.Zero, isLoading } =
    useWithdrawable(reserve.collection, tranche);
  const balance =
    tranche === TrancheType.Junior
      ? reserve.userDepositData.junior.assets
      : reserve.userDepositData.senior.assets;

  const [errorMsg, setErrorMsg] = useState('');

  const form = useForm({
    initialValues: { amount: '' },
    validateInputOnChange: true,
    validate: {
      amount: (value) => {
        if (!value) {
          return 'Please input a number.';
        }

        const num = ethers.utils.parseEther(value);

        if (num.lte(0)) {
          return 'Amount should be a positive number';
        }

        if (!withdrawable || num.gt(withdrawable)) {
          return 'Insufficient balance!';
        }

        return null;
      },
    },
  });
  const amount = ethers.utils.parseEther(form.values.amount || '0');

  const vToken =
    tranche === TrancheType.Junior
      ? reserve.juniorTrancheVToken
      : reserve.seniorTrancheVToken;
  const { address: user = ethers.constants.AddressZero } = useAccount();
  const { config, isError: isPrepareError } = usePrepareContractWrite({
    address: vToken.id as Address,
    abi: VTokenABI,
    functionName: 'withdraw',
    args: [amount, user, user],
    enabled: !isLoading && form.isValid(),
  });
  const {
    data,
    isLoading: isWriting,
    isError: isWriteError,
    write: withdraw,
  } = useContractWrite({
    ...config,
    onSuccess(tx) {
      showNotification({
        title: 'Withdrawal pending',
        message: `Withdrawing ${form.values.amount} ${reserve.currency.symbol}...`,
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
        title: 'Withdrawal Failed',
        message: error.message,
        type: 'error',
      });
      setErrorMsg(error.message);
    },
  });
  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 2,
    onSuccess,
  });

  const handleWithdraw = () => withdraw?.();

  return (
    <form onSubmit={form.onSubmit(handleWithdraw)}>
      <Box
        px={30}
        py={20}
        sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 10,
        }}
      >
        <Group noWrap>
          <Image
            src={DangerImg.src}
            height={60}
            width={90}
            objectFit="contain"
            alt="coins"
          />
          <Text>
            Please note withdrawn deposits will enter an unbonding state. In
            this state, your deposit: <br />
            - will be removed from available liquidity <br />
            - no longer accrue rewards <br />
            - must be claimed in order to complete the process <br />
          </Text>
        </Group>
      </Box>
      <Divider my={16} orientation="horizontal" />
      <Stack spacing={0} align={'end'}>
        <Text type="secondary">
          Your Current <strong>Deposit Balance</strong>
        </Text>
        <Title order={4}>
          {normalize(balance.toString(), reserve.currency.decimals)}{' '}
          <Text span inherit type="accent">
            {reserve.currency.symbol}
          </Text>
        </Title>
        <Text size="sm">{`~${usdValue(
          balance || Zero,
          priceData.latestPrice
        )}`}</Text>
      </Stack>
      <Divider my={16} orientation="horizontal" />
      <Group position="apart" mt={16}>
        <Text type="secondary">To Withdraw</Text>
        <Text type="secondary" size="xs">
          {'Balance: '}
          <Text underline span type="secondary" size="xs" weight={700}>
            {`${normalize(withdrawable.toString(), 18)} ${
              reserve.currency.symbol
            }`}
          </Text>{' '}
        </Text>
      </Group>
      <AmountInput
        mt={16}
        {...form.getInputProps('amount')}
        symbol={reserve.currency.symbol}
        maximum={withdrawable}
      />
      {errorMsg && (
        <Text mt={16} type="danger" align="center">
          Error: {errorMsg}
        </Text>
      )}
      <Button
        fullWidth
        mt={16}
        loading={isLoading || isWriting || isConfirming}
        type="submit"
        disabled={
          !form.isValid() || isPrepareError || isWriteError || isConfirming
        }
      >
        {form.isValid()
          ? isConfirming || isWriting
            ? 'Processing transaction'
            : 'Confirm withdrawal'
          : form.errors.amount || 'Enter an amount'}
      </Button>
    </form>
  );
};

export default EnterAmountStep;
