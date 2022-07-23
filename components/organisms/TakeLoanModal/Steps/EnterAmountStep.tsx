import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Group } from '@mantine/core';
import { addDecimals, formatAmount, toHexString, Zero } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import PaymentRoadmap from '@components/moleculas/PaymentRoadmap';
import { useAssetPrice, useGetUserErc20Balance } from 'hooks';
import { useContractWrite, useSigner } from 'wagmi';
import { VoyageContracts } from 'consts/addresses';
import { useGetDeployment } from 'hooks/useGetDeployment';
import { useSupportedTokensCtx } from 'hooks/context/useSupportedTokensCtx';
import showNotification from 'utils/notification';
import { getTxExpolerLink } from 'utils/env';
import { CreditLine } from 'types';
import { usdValue } from 'utils/price';
import { ReserveAssets } from 'consts';
import AllowanceWrapper from './AllowanceWrapper';

type IProps = {
  creditLine: CreditLine;
  onSuccess: () => void;
};

const EnterAmountStep: React.FC<IProps> = ({ creditLine, onSuccess }) => {
  const { data: signer } = useSigner();
  const [tokens] = useSupportedTokensCtx();
  // TODO: get from current asset context
  const symbol = creditLine.symbol;
  const [errorMsg, setErrorMsg] = useState('');
  const [margin, setMargin] = useState(0);
  const balance = useGetUserErc20Balance(symbol);

  const [isConfirming, setIsConfirming] = useState(false);
  const { address: voyagerAddress, abi: voyagerAbi } = useGetDeployment(
    VoyageContracts.Voyager
  );
  const { isLoading, writeAsync: borrow } = useContractWrite(
    {
      addressOrName: voyagerAddress,
      contractInterface: voyagerAbi,
      signerOrProvider: signer,
    },
    'borrow'
  );

  const [priceData] = useAssetPrice(ReserveAssets.TUS);

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

  const onBorrow = async () => {
    try {
      setIsConfirming(true);
      const tx = await borrow({
        args: [
          tokens[symbol],
          toHexString(addDecimals(form.values.amount, creditLine.decimals)),
          creditLine.id,
        ],
      });
      showNotification({
        title: 'Borrow pending...',
        message: `Borrowing ${form.values.amount} ${symbol}...`,
        link: getTxExpolerLink(tx.hash),
        type: 'info',
      });
      const txReceipt = await tx.wait();
      console.log('borrow tx confirmed: ', txReceipt);
      showNotification({
        title: 'Borrow success...',
        message: `Borrowed ${form.values.amount} ${symbol} successfully.`,
        link: getTxExpolerLink(tx.hash),
        type: 'success',
      });
      onSuccess();
    } catch (err) {
      setErrorMsg((err as Error).toString());
    } finally {
      setIsConfirming(false);
    }
  };

  const handleAmountChange = (eventOrValue: any) => {
    if (creditLine) {
      const value = eventOrValue?.currentTarget?.value || eventOrValue || 0;
      setMargin(
        Math.round(value * creditLine.marginRequirement.toNumber()) / 100
      );
      form.setFieldValue('amount', value);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onBorrow)}>
      <Group position="apart" mt={16} align="start">
        <Group spacing={0} direction="column">
          <Text type="secondary">
            <strong>Interest</strong>
          </Text>
          <Title order={4}>{creditLine.marginRequirement.toString()}%</Title>
        </Group>
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">Available for Loan</Text>
          <Title order={4}>
            {formatAmount(creditLine.spendableBalance)}{' '}
            <Text component="span" inherit type="accent">
              {symbol}
            </Text>
          </Title>
          <Text size="sm">{`~${usdValue(
            creditLine.spendableBalance || Zero,
            priceData.latestPrice
          )}`}</Text>
        </Group>
      </Group>
      <AllowanceWrapper vaultAddress={creditLine.id}>
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
          showMaxBtn={false}
          disabled
        />
        {errorMsg && (
          <Text mt={16} type="danger" align="center">
            Error: {errorMsg}
          </Text>
        )}
        <PaymentRoadmap
          mt={28}
          amount={form.values.amount}
          interest={creditLine.marginRequirement || Zero}
          symbol={symbol}
          assetAddress={creditLine.assetAddress}
        />
        <Button
          fullWidth
          mt={16}
          loading={isLoading || isConfirming}
          type="submit"
          disabled={!form.values.amount}
        >
          {form.values.amount ? 'Confirm Loan' : 'Enter Loan Amount'}
        </Button>
      </AllowanceWrapper>
    </form>
  );
};

export default EnterAmountStep;
