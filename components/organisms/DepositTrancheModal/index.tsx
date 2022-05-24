import { Modal } from '@components/base';
import { ModalProps } from '@mantine/core';
import { useState } from 'react';
import { DepositStatusStep, EnterAmountStep } from './Steps';
import { PoolData, TrancheTextMap, TrancheType } from 'types';
import { showNotification } from '@mantine/notifications';
import BigNumber from 'bignumber.js';
import { useGetUserErc20Balance } from '../../../hooks';

type IProps = ModalProps & {
  type: TrancheType;
  poolData?: PoolData;
  balance?: BigNumber;
  onDeposited: () => void;
  symbol: string;
};

enum STEP {
  Deposit,
  Success,
  Error,
}

const DepositTrancheModal: React.FC<IProps> = ({
  type,
  onClose: _onClose,
  poolData,
  onDeposited: _onDeposited,
  symbol,
  balance,
  ...props
}) => {
  const [step, setStep] = useState(STEP.Deposit);
  const [depositedAmount, setDepositedAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const onClose = () => {
    setStep(STEP.Deposit);
    setDepositedAmount('');
    setErrorMessage('');
    _onClose();
  };

  const onDeposited = (amount: string) => {
    setStep(STEP.Success);
    setDepositedAmount(amount);
    setErrorMessage('');
    showNotification({
      title: 'Deposit success',
      message: `Your deposit of amount ${amount} was successfull`,
      color: 'green',
    });
    _onDeposited();
  };

  const onError = (error: string) => {
    setStep(STEP.Error);
    setErrorMessage(error);
    showNotification({
      title: 'Transaction error',
      message: error,
      color: 'red',
    });
  };

  const userAssetHolding = useGetUserErc20Balance(symbol);

  return (
    <Modal
      title={
        step === STEP.Deposit
          ? `Deposit to ${TrancheTextMap[type]} Tranche`
          : null
      }
      centered
      onClose={onClose}
      {...props}
    >
      {step === STEP.Deposit && poolData && balance && (
        <EnterAmountStep
          type={type}
          onDeposited={onDeposited}
          onError={onError}
          decimals={poolData.decimals}
          totalDeposit={
            type == TrancheType.Senior
              ? poolData.seniorTrancheTotalLiquidity
              : poolData.juniorTrancheTotalLiquidity
          }
          balance={balance}
          APY={
            type == TrancheType.Senior
              ? poolData.seniorTrancheLiquidityRate
              : poolData.juniorTrancheLiquidityRate
          }
          userHoldings={userAssetHolding}
          symbol={symbol}
        />
      )}
      {(step === STEP.Success || step === STEP.Error) && (
        <DepositStatusStep
          type={type}
          amount={depositedAmount}
          // eslint-disable-next-line
          newTotal={balance!}
          error={errorMessage}
          onClose={onClose}
          symbol={symbol}
        />
      )}
    </Modal>
  );
};

export default DepositTrancheModal;
