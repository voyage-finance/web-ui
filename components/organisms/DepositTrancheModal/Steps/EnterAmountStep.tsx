import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Box, Group } from '@mantine/core';
import Image from 'next/image';
import { useAccount, useContractWrite, useSigner } from 'wagmi';
import { addDecimals, toHexString, Zero } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { useForm } from '@mantine/form';
import { TrancheTextMap, TrancheType } from 'types';
import { useAssetPrice, useGetUserErc20Balance } from 'hooks';
import { ReserveAssets } from 'consts';
import { usdValue } from 'utils/price';
import { VoyageContracts } from 'consts/addresses';
import { useGetDeployment } from 'hooks/useGetDeployment';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { getTxExpolerLink } from 'utils/env';
import { shortenHash } from 'utils/hash';
import DangerImg from 'assets/danger.png';
import { useSupportedTokensCtx } from 'hooks/context/useSupportedTokensCtx';
import {
  usePoolDataCtx,
  useSymbolCtx,
  useUserDataCtx,
} from 'hooks/context/usePoolDataCtx';

type IProps = {
  type: TrancheType;
  onDeposited: (amount: string) => void;
  onError: (message: string) => void;
};

const EnterAmountStep: React.FC<IProps> = ({ type, onDeposited, onError }) => {
  const [symbol] = useSymbolCtx();
  const { data: accountData } = useAccount();
  const { data: signer } = useSigner();
  const [tokens] = useSupportedTokensCtx();
  const [poolData] = usePoolDataCtx();
  const [userData] = useUserDataCtx();
  const [priceData] = useAssetPrice(ReserveAssets.TUS);
  const userHoldings = useGetUserErc20Balance(symbol);
  const APY = poolData
    ? type == TrancheType.Senior
      ? poolData.seniorTrancheLiquidityRate
      : poolData.juniorTrancheLiquidityRate
    : Zero;
  const totalDeposit = poolData
    ? type == TrancheType.Senior
      ? poolData.seniorTrancheTotalLiquidity
      : poolData.juniorTrancheTotalLiquidity
    : Zero;
  const balance = userData
    ? type === TrancheType.Junior
      ? userData.juniorTrancheBalance
      : userData.seniorTrancheBalance
    : Zero;
  const { address: voyagerAddress, abi: voyagerAbi } = useGetDeployment(
    VoyageContracts.Voyager
  );

  const [isConfirming, setIsConfirming] = useState(false);
  const { isLoading, writeAsync: deposit } = useContractWrite(
    {
      addressOrName: voyagerAddress,
      contractInterface: voyagerAbi,
      signerOrProvider: signer,
    },
    'deposit'
  );

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

  const onDeposit = async () => {
    if (poolData && userData)
      try {
        setIsConfirming(true);
        const tx = await deposit({
          args: [
            tokens[symbol],
            type == TrancheType.Senior ? '1' : '0',
            toHexString(addDecimals(form.values.amount, poolData.decimals)),
            accountData?.address,
          ],
        });
        showNotification({
          title: 'Deposit sent',
          message: (
            <div>
              Transaction block is initialized{' '}
              <a href={getTxExpolerLink(tx.hash)}>{shortenHash(tx.hash)}</a>
            </div>
          ),
          color: 'green',
        });
        const txReceipt = await tx.wait();
        console.log('deposit tx confirmed: ', txReceipt);
        onDeposited(form.values.amount);
      } catch (err) {
        onError((err as Error).toString());
      } finally {
        setIsConfirming(false);
      }
    else {
      showNotification({
        title: 'Error',
        message: "Pool and user data aren't fetched",
        color: 'red',
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
          <Title order={4}>{APY?.toFixed(3, BigNumber.ROUND_UP)}%</Title>
        </Group>
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">
            <strong>{TrancheTextMap[type]}</strong> Tranche Liquidity
          </Text>
          <Title order={4}>
            {totalDeposit?.toFixed(3, BigNumber.ROUND_UP)}{' '}
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
            {balance?.toFixed(3, BigNumber.ROUND_UP)}{' '}
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
            {`${userHoldings?.toFixed(3, BigNumber.ROUND_UP)} ${symbol}`}
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
