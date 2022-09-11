import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Box, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import DangerImg from 'assets/danger.png';
import BigNumber from 'bignumber.js';
import { ReserveAssets } from 'consts';
import { VoyageContracts } from 'consts/addresses';
import { useAssetPrice, useGetUserErc20Balance } from 'hooks';
import {
  usePoolDataCtx,
  useSymbolCtx,
  useUserDataCtx,
} from 'hooks/context/usePoolDataCtx';
import { useSupportedTokensCtx } from 'hooks/context/useSupportedTokensCtx';
import { useGetDeployment } from 'hooks/useGetDeployment';
import Image from 'next/image';
import { useState } from 'react';
import { TrancheTextMap, TrancheType } from 'types';
import {
  addDecimals,
  formatAmount,
  formatPercent,
  toHexString,
  Zero,
} from 'utils/bn';
import { getTxExplorerLink } from 'utils/env';
import { showNotification } from 'utils/notification';
import { usdValue } from 'utils/price';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';

type IProps = {
  type: TrancheType;
  onDeposited: (amount: string) => void;
  onError: (message: string) => void;
};

const EnterAmountStep: React.FC<IProps> = ({ type, onDeposited, onError }) => {
  const [symbol] = useSymbolCtx();
  const account = useAccount();
  const [tokens] = useSupportedTokensCtx();
  const [poolData] = usePoolDataCtx();
  const [userData] = useUserDataCtx();
  const [priceData] = useAssetPrice(ReserveAssets.ETH);
  const userHoldings = useGetUserErc20Balance(symbol);
  const APY = poolData
    ? type == TrancheType.Senior
      ? poolData.seniorTrancheDepositRate
      : poolData.juniorTrancheDepositRate
    : Zero;
  const totalDeposit = poolData
    ? type == TrancheType.Senior
      ? poolData.seniorTrancheLiquidity
      : poolData.juniorTrancheLiquidity
    : Zero;
  const balance = userData
    ? type === TrancheType.Junior
      ? userData.juniorTrancheBalance
      : userData.seniorTrancheBalance
    : Zero;
  const { address: voyageAddress, abi: voyageABI } = useGetDeployment(
    VoyageContracts.Voyage
  );

  const [isConfirming, setIsConfirming] = useState(false);
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

        if (!userHoldings || num.gt(userHoldings)) {
          return 'Insufficient balance!';
        }

        return null;
      },
    },
  });
  const { config } = usePrepareContractWrite({
    addressOrName: voyageAddress,
    contractInterface: voyageABI,
    // signerOrProvider: signer,
    functionName: 'deposit',
    args: [
      tokens[symbol],
      type == TrancheType.Senior ? '1' : '0',
      toHexString(addDecimals(form.values.amount, poolData!.currency.decimals)),
      account?.address,
    ],
  });
  const { isLoading, writeAsync: deposit } = useContractWrite(config);

  const onDeposit = async () => {
    if (poolData && userData) {
      let tx;
      try {
        setIsConfirming(true);
        tx = await deposit?.();
        showNotification({
          title: 'Deposit Pending',
          message: `Depositing ${form.values.amount} ${symbol}...`,
          type: 'success',
          link: getTxExplorerLink(tx?.hash ?? ''),
        });
        const txReceipt = await tx?.wait();
        console.log('deposit tx confirmed: ', txReceipt);
        showNotification({
          type: 'success',
          title: 'Deposit success',
          message: `Deposited ${form.values.amount} ${symbol} successfully.`,
          link: getTxExplorerLink(tx?.hash ?? ''),
        });
        onDeposited(form.values.amount);
      } catch (err) {
        const error = (err as Error).toString();
        onError(error);
        showNotification({
          title: 'Deposit Failed',
          message: error,
          type: 'error',
          link: tx?.hash ? getTxExplorerLink(tx.hash) : undefined,
        });
      } finally {
        setIsConfirming(false);
      }
    } else {
      showNotification({
        title: 'Deposit Failed',
        message: "Pool and user data aren't fetched",
        type: 'error',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(onDeposit)}>
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
            <Text weight="bold" sx={{ whiteSpace: 'nowrap' }}>
              Depositing will lock your funds for 14 days.
            </Text>
            Withdrawals will need to undergo a 14-day unbonding phase before the
            amount is liquid.
          </Text>
        </Group>
      </Box>
      <Group position="apart" mt={16} align="start">
        <Group spacing={0} direction="column">
          <Text type="secondary">
            <strong>{TrancheTextMap[type]}</strong> APY
          </Text>
          <Title order={4}>{formatPercent(APY)}</Title>
        </Group>
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">
            <strong>{TrancheTextMap[type]}</strong> Tranche Liquidity
          </Text>
          <Title order={4}>
            {formatAmount(totalDeposit)}{' '}
            <Text component="span" inherit type="accent">
              {symbol}
            </Text>
          </Title>
          <Text size="sm">{`~${usdValue(
            totalDeposit || Zero,
            priceData.latestPrice
          )}`}</Text>
        </Group>
      </Group>
      <Divider my={16} orientation="horizontal" />
      <Group position="apart">
        <Text type="secondary">Your Current Total Deposit</Text>
        <Group direction="column" spacing={0} align="end">
          <Title order={5}>
            {formatAmount(balance)}{' '}
            <Text weight={400} component="span">
              {symbol}
            </Text>
          </Title>
          <Text type="secondary">{`~${usdValue(
            balance || Zero,
            priceData.latestPrice
          )}`}</Text>
        </Group>
      </Group>
      <Group position="apart" mt={16}>
        <Text type="secondary">To Deposit</Text>
        <Text type="secondary" size="xs">
          {'Balance: '}
          <Text
            underline
            component="span"
            type="secondary"
            size="xs"
            weight={700}
          >
            {`${formatAmount(userHoldings)} ${symbol}`}
          </Text>{' '}
        </Text>
      </Group>
      <AmountInput mt={16} {...form.getInputProps('amount')} symbol={symbol} />
      <Button
        fullWidth
        mt={16}
        loading={isLoading || isConfirming}
        type="submit"
        disabled={!form.values.amount}
      >
        {form.values.amount ? 'Confirm deposit' : 'Enter Deposit Amount'}
      </Button>
    </form>
  );
};

export default EnterAmountStep;
