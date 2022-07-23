import { Modal } from '@components/base';
import { ModalProps } from '@mantine/core';
import { Button, Divider, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Group } from '@mantine/core';
import { formatAmount, Zero } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import PaymentRoadmap from '@components/moleculas/PaymentRoadmap';
import { useAssetPrice, useGetUserErc20Balance } from 'hooks';
import { useContractWrite, useSigner } from 'wagmi';
import { VoyageContracts } from 'consts/addresses';
import { useGetDeployment } from 'hooks/useGetDeployment';
import { useSupportedTokensCtx } from 'hooks/context/useSupportedTokensCtx';
import showNotification from 'utils/notification';
import { getTxExpolerLink } from 'utils/env';
import { Loan, CreditLine } from 'types';
import { usdValue } from 'utils/price';
import { ReserveAssets } from 'consts';
import moment from 'moment';

type IProps = ModalProps & {
  loan: Loan;
  creditLine: CreditLine;
  onUpdate: () => void;
};

const RepayLoanModal: React.FC<IProps> = ({
  onClose,
  onUpdate,
  loan,
  creditLine,
  ...props
}) => {
  const { data: signer } = useSigner();
  const [tokens] = useSupportedTokensCtx();
  const symbol = loan.symbol;
  const [errorMsg, setErrorMsg] = useState('');
  const balance = useGetUserErc20Balance(symbol);

  const [isConfirming, setIsConfirming] = useState(false);
  const { address: voyagerAddress, abi: voyagerAbi } = useGetDeployment(
    VoyageContracts.Voyager
  );

  const paymentDaysLeft = loan.nextPaymentDue
    ? moment(loan.nextPaymentDue).diff(moment(), 'days')
    : 0;
  const graceDaysLeft = paymentDaysLeft < 0 ? -paymentDaysLeft : 0;

  const { isLoading, writeAsync: repay } = useContractWrite(
    {
      addressOrName: voyagerAddress,
      contractInterface: voyagerAbi,
      signerOrProvider: signer,
    },
    'repay'
  );

  const [priceData] = useAssetPrice(ReserveAssets.TUS);

  const onRepay = async () => {
    try {
      const loanId = loan.id.slice(-1);
      const amount = formatAmount(loan.pmt_payment);

      console.log(
        'voyager, loanId, vault',
        voyagerAddress,
        loanId,
        creditLine?.id
      );
      setIsConfirming(true);
      const tx = await repay({
        args: [tokens[symbol], loanId, creditLine?.id],
      });
      showNotification({
        title: 'Repay pending...',
        message: `Repaying ${amount} ${symbol}...`,
        link: getTxExpolerLink(tx.hash),
        type: 'info',
      });
      const txReceipt = await tx.wait();
      console.log('Repay tx confirmed: ', txReceipt);
      showNotification({
        title: 'Repay success...',
        message: `Repayed ${amount} ${symbol} successfully.`,
        link: getTxExpolerLink(tx.hash),
        type: 'success',
      });
      onUpdate();
      onClose();
    } catch (err) {
      setErrorMsg((err as Error).toString());
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Modal title={`Repay Loan | Crabada`} centered onClose={onClose} {...props}>
      <div>
        <Group position="apart" mt={16} align="start">
          <Group spacing={0} direction="column" align={'start'}>
            <Text type="secondary">Repayment Schedule</Text>
            <Title order={4}>
              {formatAmount(loan.pmt_payment)}{' '}
              <Text component="span" inherit type="accent">
                {symbol}
              </Text>
            </Title>
            <Text size="sm">
              Every {loan.epoch} Days | {loan.nper} Repayments
            </Text>
          </Group>
          <Group spacing={0} direction="column" align={'end'}>
            <Text type="secondary">Outstanding Loan</Text>
            <Title order={4}>
              {formatAmount(loan.principal)}{' '}
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
        <Divider my={16} orientation="horizontal" />
        <PaymentRoadmap
          mt={28}
          amount={loan.pmt_payment.multipliedBy(loan.nper).toString() || '0'}
          interest={Zero}
          symbol={symbol}
          startDate={loan.borrowAt}
          assetAddress={creditLine.assetAddress}
        />
        <Group direction="column" align="stretch" mt={16} spacing={5}>
          <Group position="apart">
            <Text type="secondary">Repayment Due</Text>
            <Text>
              <strong>{formatAmount(loan.pmt_principal)}</strong> {symbol}
            </Text>
          </Group>
          <Group position="apart">
            <Text type="secondary" size="sm">
              Repayment Period
            </Text>
            <Text size="sm">
              {paymentDaysLeft > 0 ? paymentDaysLeft : 0} of 30 days left
            </Text>
          </Group>
          <Group position="apart">
            <Text type="secondary" size="sm">
              Grace Period
            </Text>
            <Text size="sm">{graceDaysLeft} of 14 days left</Text>
          </Group>
        </Group>
        <Group position="apart" mt={16}>
          <Text type="secondary">Repayment Amount</Text>
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
          value={loan.pmt_payment.toFixed(3, BigNumber.ROUND_UP)}
          onChange={() => undefined}
          symbol={symbol}
          disabled
          showMaxBtn={false}
        />
        {errorMsg && (
          <Text mt={16} type="danger" align="center">
            Error: {errorMsg}
          </Text>
        )}
        <Button
          fullWidth
          mt={16}
          loading={isLoading || isConfirming}
          onClick={onRepay}
        >
          Confirm Repay
        </Button>
      </div>
    </Modal>
  );
};

export default RepayLoanModal;
