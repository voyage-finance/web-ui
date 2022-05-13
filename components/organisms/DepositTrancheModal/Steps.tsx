import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Group } from '@mantine/core';
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

  const {
    isLoading,
    error,
    writeAsync: deposit,
  } = useContractWrite(
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

        if (!userHoldings || num > userHoldings) {
          return 'Insufficient balance!';
        }

        return null;
      },
    },
  });

  const onDeposit = async () => {
    await deposit({
      args: [
        tokens[symbol],
        type == TrancheType.Senior ? '1' : '0',
        toHexString(addDecimals(form.values.amount, decimals)),
        accountData?.address,
      ],
    });
    if (error) onError(error.message);
    else onDeposited(form.values.amount);
  };

  return (
    <form onSubmit={form.onSubmit(onDeposit)}>
      <Image
        src="/crabada-cover.png"
        alt="crabada"
        layout="responsive"
        width={425}
        height={108}
        objectFit="cover"
      />
      <Group position="apart" mt={16} align="start">
        <Group spacing={0} direction="column">
          <Text type="secondary">{TrancheTextMap[type]} Tranche Liquidity</Text>
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
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">{TrancheTextMap[type]} APY</Text>
          <Title order={4}>{APY?.toString()}%</Title>
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
        <Text type="secondary">Add Deposit</Text>
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
        loading={isLoading}
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
}) => {
  const [priceData] = useAssetPrice(ReserveAssets.TUS);
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
          <Group position="apart">
            <Text type="secondary">Your Deposit Made</Text>
            <Group direction="column" spacing={0} align="end">
              <Title order={5}>
                + {amount}{' '}
                <Text weight={400} component="span">
                  {symbol}
                </Text>
              </Title>
              <Text type="secondary">{`~${usdValue(
                new BigNumber(amount),
                priceData.latestPrice
              )}`}</Text>
            </Group>
          </Group>
          <Group position="apart" mt={16}>
            <Text type="secondary">Your New Total Deposit</Text>
            <Group direction="column" spacing={0} align="end">
              <Title order={5}>
                <Text inherit type="gradient" component="span">
                  {newTotal.toFixed()} {symbol}
                </Text>
              </Title>
              <Text type="secondary">{`~${usdValue(
                newTotal,
                priceData.latestPrice
              )}`}</Text>
            </Group>
          </Group>
        </>
      )}
      <Button fullWidth mt={16} onClick={onClose}>
        Done
      </Button>
    </>
  );
};
