import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Group } from '@mantine/core';
import { formatAmount, Zero } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import PaymentRoadmap from '@components/moleculas/PaymentRoadmap';

type IProps = {
  onSuccess: () => void;
};

const EnterAmountStep: React.FC<IProps> = ({}) => {
  const symbol = 'TUS';
  const [isLoading] = useState(false);
  const balance = Zero;

  const [errorMsg] = useState('');

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

        if (!balance || num.gt(balance)) {
          return 'Insufficient balance!';
        }

        return null;
      },
    },
  });

  const borrow = async () => undefined;

  return (
    <form onSubmit={form.onSubmit(borrow)}>
      <Group position="apart" mt={16} align="start">
        <Group spacing={0} direction="column">
          <Text type="secondary">
            <strong>Interest</strong>
          </Text>
          <Title order={4}>X.XX%</Title>
        </Group>
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">Available for Loan</Text>
          <Title order={4}>
            100,199,856,553.84956{' '}
            <Text component="span" inherit type="accent">
              {symbol}
            </Text>
          </Title>
          <Text size="sm">~$100,000,000,000.00</Text>
        </Group>
      </Group>
      <Divider my={16} orientation="horizontal" />
      <Group position="apart" mt={16}>
        <Text type="secondary">Loan Amount</Text>
      </Group>
      <AmountInput
        mt={12}
        {...form.getInputProps('amount')}
        symbol={symbol}
        maximum={balance}
      />
      <Group position="apart" mt={16}>
        <Text type="secondary">Margin Required</Text>
        <Text type="secondary" size="xs">
          {'Balance: '}
          <Text
            underline
            component="span"
            type="secondary"
            size="xs"
            weight={700}
          >
            {`${formatAmount(balance)} ${symbol}`}
          </Text>{' '}
        </Text>
      </Group>
      <AmountInput
        mt={12}
        {...form.getInputProps('amount')}
        symbol={symbol}
        maximum={balance}
      />
      {errorMsg && (
        <Text mt={16} type="danger" align="center">
          Error: {errorMsg}
        </Text>
      )}
      <PaymentRoadmap mt={28} />
      <Button
        fullWidth
        mt={16}
        loading={isLoading}
        type="submit"
        disabled={!form.values.amount}
      >
        {form.values.amount ? 'Confirm Loan' : 'Enter Loan Amount'}
      </Button>
    </form>
  );
};

export default EnterAmountStep;
