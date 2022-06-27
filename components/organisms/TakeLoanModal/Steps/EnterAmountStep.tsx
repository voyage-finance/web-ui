import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Group } from '@mantine/core';
import { formatAmount } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import PaymentRoadmap from '@components/moleculas/PaymentRoadmap';
import { useGetUserErc20Balance } from 'hooks';

type IProps = {
  onSuccess: () => void;
};

const EnterAmountStep: React.FC<IProps> = ({}) => {
  const symbol = 'TUS';
  const [isLoading] = useState(false);
  const [errorMsg] = useState('');
  const [margin, setMargin] = useState(0);
  const balance = useGetUserErc20Balance(symbol);

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

  const handleAmountChange = (eventOrValue: any) => {
    const value = eventOrValue?.currentTarget?.value || eventOrValue || 0;
    setMargin(Math.round(value * 0.1 * 100) / 100);
    form.setFieldValue('amount', value);
  };

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
            XXX,XXXXX{' '}
            <Text component="span" inherit type="accent">
              {symbol}
            </Text>
          </Title>
          <Text size="sm">~$XXX,XXX,XXX.00</Text>
        </Group>
      </Group>
      <Divider my={16} orientation="horizontal" />
      <Group position="apart" mt={16}>
        <Text type="secondary">Loan Amount</Text>
      </Group>
      <AmountInput
        mt={12}
        {...form.getInputProps('amount')}
        onChange={handleAmountChange}
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
        value={margin}
        onChange={() => undefined}
        symbol={symbol}
        maximum={balance}
        showMaxBtn={false}
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
