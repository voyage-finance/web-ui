import { Modal } from '@components/base';
import { LoadingOverlay, ModalProps } from '@mantine/core';
import { useState } from 'react';
import DepositStatusStep from './Steps/DepositStatusStep';
import EnterAmountStep from './Steps/EnterAmountStep';
import { TrancheTextMap, TrancheType } from 'types';
import { showNotification } from '@mantine/notifications';
import { usePoolDataCtx, useUserDataCtx } from 'hooks/context/usePoolDataCtx';

type IProps = ModalProps & {
  type: TrancheType;
};

enum STEP {
  Deposit,
  Success,
  Error,
}

const DepositTrancheModal: React.FC<IProps> = ({
  type,
  onClose: _onClose,
  ...props
}) => {
  const [, isPoolDataLoading, refetchPool] = usePoolDataCtx();
  const [, isUserDataLoading, refetchData] = useUserDataCtx();
  const [step, setStep] = useState(STEP.Deposit);
  const [depositedAmount, setDepositedAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onDeposited = (amount: string) => {
    setStep(STEP.Success);
    setDepositedAmount(amount);
    setErrorMessage('');
    showNotification({
      title: 'Deposit success',
      message: `Your deposit of amount ${amount} was successfull`,
      color: 'green',
    });
    refetchPool();
    refetchData();
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

  const onClose = () => {
    setStep(STEP.Deposit);
    setDepositedAmount('');
    setErrorMessage('');
    _onClose();
  };

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
      <LoadingOverlay visible={isUserDataLoading || isPoolDataLoading} />
      {step === STEP.Deposit && (
        <EnterAmountStep
          type={type}
          onDeposited={onDeposited}
          onError={onError}
        />
      )}
      {(step === STEP.Success || step === STEP.Error) && (
        <DepositStatusStep
          type={type}
          amount={depositedAmount}
          error={errorMessage}
          onClose={onClose}
        />
      )}
    </Modal>
  );
};

export default DepositTrancheModal;
