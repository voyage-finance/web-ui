import { Modal } from '@components/base';
import { useReserve } from '@hooks/useReserve';
import { LoadingOverlay, ModalProps } from '@mantine/core';
import { TrancheTextMap, TrancheType } from '@types';
import { useState } from 'react';
import { Address, useAccount } from 'wagmi';
import DepositStatusStep from './Steps/DepositStatusStep';
import EnterAmountStep from './Steps/EnterAmountStep';

type IProps = ModalProps & {
  collection: Address;
  tranche: TrancheType;
};

enum STEP {
  Deposit,
  Success,
  Error,
}

const DepositModal: React.FC<IProps> = ({
  collection,
  tranche,
  onClose: _onClose,
  ...props
}) => {
  const { address } = useAccount();
  const { isLoading, refetch } = useReserve(collection, address);
  const [step, setStep] = useState(STEP.Deposit);
  const [depositedAmount, setDepositedAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onDeposited = (amount: string) => {
    setStep(STEP.Success);
    setDepositedAmount(amount);
    setErrorMessage('');
    refetch();
  };

  const onError = (error: string) => {
    setStep(STEP.Error);
    setErrorMessage(error);
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
          ? `Deposit to ${TrancheTextMap[tranche]} Tranche`
          : null
      }
      centered
      onClose={onClose}
      {...props}
    >
      <LoadingOverlay visible={isLoading} />
      {step === STEP.Deposit && (
        <EnterAmountStep
          collection={collection}
          tranche={tranche}
          onDeposited={onDeposited}
          onError={onError}
        />
      )}
      {(step === STEP.Success || step === STEP.Error) && (
        <DepositStatusStep
          collection={collection}
          tranche={tranche}
          amount={depositedAmount}
          error={errorMessage}
          onClose={onClose}
        />
      )}
    </Modal>
  );
};

export default DepositModal;
