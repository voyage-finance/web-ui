import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Box, Group } from '@mantine/core';
import Image from 'next/image';
import { formatAmount, Zero } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { useForm } from '@mantine/form';
import { TrancheType } from 'types';
import { useAssetPrice, useWithdraw } from 'hooks';
import { ReserveAssets } from 'consts';
import { usdValue } from 'utils/price';
import { useState } from 'react';
import DangerImg from 'assets/danger.png';
import {
  usePoolDataCtx,
  useSymbolCtx,
  useUserDataCtx,
} from 'hooks/context/usePoolDataCtx';
import { showNotification } from 'utils/notification';
import { getTxExpolerLink } from 'utils/env';

type IProps = {
  type: TrancheType;
  onSuccess: () => void;
};

const EnterAmountStep: React.FC<IProps> = ({ type, onSuccess }) => {
  const [symbol] = useSymbolCtx();
  const [userData] = useUserDataCtx();
  const [poolData] = usePoolDataCtx();
  const [priceData] = useAssetPrice(ReserveAssets.TUS);
  const { onWithdraw } = useWithdraw();
  const [isLoading, setIsLoading] = useState(false);
  const balance = userData
    ? type === TrancheType.Junior
      ? userData.juniorTrancheBalance
      : userData.seniorTrancheBalance
    : Zero;
  const withdrawable = userData
    ? type === TrancheType.Junior
      ? userData.withdrawableJuniorBalance
      : userData.withdrawableSeniorBalance
    : Zero;

  const [errorMsg, setErrorMsg] = useState('');

  const form = useForm({
    initialValues: { amount: '' },
    validate: {
      amount: (value) => {
        if (!value) {
          return 'Please input a number.';
        }

        const num = new BigNumber(value);

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

  const withdraw = async () => {
    if (userData && poolData) {
      try {
        setIsLoading(true);
        const tx = await onWithdraw(
          form.values.amount,
          type,
          poolData.decimals,
          symbol
        );
        showNotification({
          title: 'Withdrawal pending',
          message: `Withdrawing ${form.values.amount} ${symbol}...`,
          type: 'info',
          link: getTxExpolerLink(tx.hash),
        });
        const txReceipt = await tx.wait();
        console.log('withdrawal tx confirmed: ', txReceipt);
        onSuccess();
      } catch (err) {
        showNotification({
          title: 'Transaction error',
          message: (err as Error).toString(),
          type: 'error',
        });
        setErrorMsg((err as Error).toString());
      } finally {
        setIsLoading(false);
      }
    } else {
      showNotification({
        title: 'Error',
        message: "Pool and user data aren't fetched",
        type: 'error',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(withdraw)}>
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
            Please note withdrawn deposits will enter a{' '}
            <strong>14-day unbonding phase</strong>. Once unbonding begins, you
            will: <br />
            - no longer accrue rewards on the unbonding amount <br />
            - not be able to cancel unbonding <br />
            - need to wait 14 days for the amount to be liquid <br />
          </Text>
        </Group>
      </Box>
      <Divider my={16} orientation="horizontal" />
      <Group spacing={0} direction="column" align={'end'}>
        <Text type="secondary">
          Your Current <strong>Deposit Balance</strong>
        </Text>
        <Title order={4}>
          {formatAmount(balance)}{' '}
          <Text component="span" inherit type="accent">
            {symbol}
          </Text>
        </Title>
        <Text size="sm">{`~${usdValue(
          balance || Zero,
          priceData.latestPrice
        )}`}</Text>
      </Group>
      <Divider my={16} orientation="horizontal" />
      <Group position="apart" mt={16}>
        <Text type="secondary">To Withdraw</Text>
        <Text type="secondary" size="xs">
          {'Balance: '}
          <Text
            underline
            component="span"
            type="secondary"
            size="xs"
            weight={700}
          >
            {`${formatAmount(withdrawable)} ${symbol}`}
          </Text>{' '}
        </Text>
      </Group>
      <AmountInput
        mt={16}
        {...form.getInputProps('amount')}
        symbol={symbol}
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
        loading={isLoading}
        type="submit"
        disabled={!form.values.amount}
      >
        {form.values.amount ? 'Confirm Withdrawal' : 'Enter Withdrawal Amount'}
      </Button>
    </form>
  );
};

export default EnterAmountStep;
