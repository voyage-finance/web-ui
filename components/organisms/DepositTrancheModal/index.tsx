import { Divider, Modal, Button, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Group, ModalProps } from '@mantine/core';
import Image from 'next/image';
import { useAccount, useContractWrite, useSigner } from 'wagmi';
import Voyager from 'deployments/localhost/Voyager.json';
import Tus from 'deployments/localhost/Tus.json';
import { useForm } from '@mantine/hooks';
import { useState } from 'react';
import { DepositSuccessStep, EnterAmountStep } from './Steps';
import { TrancheTextMap, TrancheType } from 'types';

type IProps = ModalProps & {
  type: TrancheType;
};

const DepositTrancheModal: React.FC<IProps> = ({
  type,
  onClose: _onClose,
  ...props
}) => {
  const [depositedAmount, setDepositedAmount] = useState('');
  const onClose = () => {
    setDepositedAmount('');
    _onClose();
  };
  return (
    <Modal
      title={
        !depositedAmount ? `Deposit to ${TrancheTextMap[type]} Tranche` : null
      }
      centered
      onClose={onClose}
      {...props}
    >
      {!depositedAmount ? (
        <EnterAmountStep
          type={type}
          onDeposited={(amount) => setDepositedAmount(amount)}
        />
      ) : (
        <DepositSuccessStep
          type={type}
          amount={depositedAmount}
          onClose={onClose}
        />
      )}
    </Modal>
  );
};

export default DepositTrancheModal;
