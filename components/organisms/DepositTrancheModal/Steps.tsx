import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Box, Group } from '@mantine/core';
import Image from 'next/image';
import { useAccount, useContractWrite, useSigner } from 'wagmi';
import { addDecimals, toHexString, Zero } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { useForm } from '@mantine/form';
import { TrancheTextMap, TrancheType } from 'types';
import { useAssetPrice, useSupportedTokens } from 'hooks';
import { ReserveAssets } from 'consts';
import { usdValue } from 'utils/price';
import { VoyageContracts } from '../../../consts/addresses';
import { useGetDeployment } from '../../../hooks/useGetDeployment';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { getTxExpolerLink } from 'utils/env';
import { shortenHash } from 'utils/hash';
import DangerImg from 'assets/danger.png';

type IProps1 = {
  type: TrancheType;
  onDeposited: (amount: string) => void;
  onError: (message: string) => void;
  decimals: number;
  totalDeposit: BigNumber;
  balance: BigNumber;
  APY?: BigNumber;
  symbol: string;
  userHoldings?: BigNumber;
};

export const EnterAmountStep: React.FC<IProps1> = ({
  type,
  onDeposited,
  onError,
  decimals,
  totalDeposit,
  APY,
  balance,
  symbol,
  userHoldings,
}) => {
  const { data: accountData } = useAccount();
  const { data: signer } = useSigner();
  const [tokens] = useSupportedTokens();
  const [priceData] = useAssetPrice(ReserveAssets.TUS);
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
    try {
      setIsConfirming(true);
      const tx = await deposit({
        args: [
          tokens[symbol],
          type == TrancheType.Senior ? '1' : '0',
          toHexString(addDecimals(form.values.amount, decimals)),
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

type IProps2 = {
  type: TrancheType;
  amount: string;
  newTotal: BigNumber;
  totalLiquidity: BigNumber;
  error: string;
  onClose: () => void;
  symbol: string;
};

export const DepositStatusStep: React.FC<IProps2> = ({
  type,
  amount,
  newTotal,
  onClose,
  error,
  symbol,
  totalLiquidity,
}) => {
  const [priceData] = useAssetPrice(ReserveAssets.TUS);
  const totalShare = newTotal.div(totalLiquidity).multipliedBy(100);
  return (
    <>
      <Title order={3} align="center" mt={-32}>
        <Text inherit component={'span'} type="gradient">
          Deposit Success!{' '}
        </Text>
      </Title>
      {!error ? (
        <Text align="center" my={16}>
          You have successfully made a new deposit into the{' '}
          {TrancheTextMap[type]} Tranche. Please view your summary below.
        </Text>
      ) : (
        <Text align="center" my={16}>
          Transaction to deposit into the {TrancheTextMap[type]} Tranche was
          unsuccessfull.
          <Text type="danger">{error}</Text>
        </Text>
      )}
      {!error && (
        <>
          <Image
            src="/crabada-cover.png"
            alt="crabada"
            layout="responsive"
            width={425}
            height={108}
            objectFit="cover"
          />
          <Divider my={16} orientation="horizontal" />
          <Group position="apart" align="start">
            <Text type="secondary">Your Deposit Made</Text>
            <Group direction="column" spacing={0} align="end">
              <Title order={5} style={{ color: '#0CCDAA' }}>
                + {amount}{' '}
                <Text
                  weight={400}
                  component="span"
                  style={{ color: '#0CCDAA' }}
                >
                  {symbol}
                </Text>
              </Title>
              <Text size="sm" type="secondary">{`~${usdValue(
                new BigNumber(amount),
                priceData.latestPrice
              )}`}</Text>
            </Group>
          </Group>
          <Group position="apart" align="start" mt={16}>
            <Text type="secondary">Your New Total Deposit</Text>
            <Group direction="column" spacing={0} align="end">
              <Title order={5}>
                <Text inherit type="gradient" component="span">
                  {newTotal.toFixed(3, BigNumber.ROUND_UP)} {symbol}
                </Text>
              </Title>
              <Text size="sm" type="secondary">{`~${usdValue(
                newTotal,
                priceData.latestPrice
              )}`}</Text>
            </Group>
          </Group>
          <Group position="apart" align="start" mt={16}>
            <Text type="secondary">Your New Tranche Share</Text>
            <Title order={5}>{totalShare.toFixed(3)} %</Title>
          </Group>
        </>
      )}
      <Button fullWidth mt={26} onClick={onClose}>
        Done
      </Button>
    </>
  );
};
