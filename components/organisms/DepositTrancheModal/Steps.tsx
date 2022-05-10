import { Divider, Button, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Group } from '@mantine/core';
import Image from 'next/image';
import { useAccount, useContractWrite, useSigner } from 'wagmi';
import VoyagerAbi from 'abi/Voyager.json';
import { VOYAGER_ADDRESS, TUS_ADDRESS } from 'abi/addresses';
import { addDecimals, toHexString } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { useForm } from '@mantine/form';
import { TrancheTextMap, TrancheType } from 'types';
import { useRouter } from 'next/router';
import { getTokenSymbol } from 'utils/hooks';

type IProps1 = {
  type: TrancheType;
  onDeposited: (amount: string) => void;
  onError: (message: string) => void;
  decimals: number;
  totalDeposit: BigNumber;
  APY?: BigNumber;
  symbol: string;
};

export const EnterAmountStep: React.FC<IProps1> = ({
  type,
  onDeposited,
  onError,
  decimals,
  totalDeposit,
  APY,
  symbol,
}) => {
  const router = useRouter();
  const { data: accountData } = useAccount();
  const { data: signer } = useSigner();

  const {
    isLoading,
    error,
    writeAsync: deposit,
  } = useContractWrite(
    {
      addressOrName: VOYAGER_ADDRESS,
      contractInterface: VoyagerAbi,
      signerOrProvider: signer,
    },
    'deposit'
  );

  const form = useForm({
    initialValues: { amount: '' },
    validate: {
      amount: (value) =>
        value && new BigNumber(value).gt(0)
          ? null
          : 'Amount should be a positive number',
    },
  });

  const onDeposit = async () => {
    await deposit({
      args: [
        TUS_ADDRESS,
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
            {totalDeposit?.toString()}{' '}
            <Text component="span" inherit type="accent">
              {symbol}
            </Text>
          </Title>
          <Text size="sm">$-</Text>
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
            {totalDeposit?.toString()}{' '}
            <Text weight={400} component="span">
              {symbol}
            </Text>
          </Title>
          <Text type="secondary">$-</Text>
        </Group>
      </Group>
      <Group position="apart" mt={16}>
        <Text type="secondary">Add Deposit</Text>
        <Text type="secondary" size="xs">
          Balance{' '}
          <Text
            underline
            component="span"
            type="secondary"
            size="xs"
            weight={700}
          >
            - {symbol}
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
  error: string;
  onClose: () => void;
  symbol: string;
};

export const DepositStatusStep: React.FC<IProps2> = ({
  type,
  amount,
  onClose,
  error,
  symbol,
}) => {
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
                +{amount}{' '}
                <Text weight={400} component="span">
                  {symbol}
                </Text>
              </Title>
              <Text type="secondary">${amount}</Text>
            </Group>
          </Group>
          <Group position="apart" mt={16}>
            <Text type="secondary">Your New Total Deposit</Text>
            <Group direction="column" spacing={0} align="end">
              <Title order={5}>
                <Text inherit type="gradient" component="span">
                  +{amount} {symbol}
                </Text>
              </Title>
              <Text type="secondary">${amount}</Text>
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
