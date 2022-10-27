import { Modal } from '@components/base';
import { DEFAULT_RESERVE_STATE, useReserve } from '@hooks/useReserve';
import { LoadingOverlay, ModalProps } from '@mantine/core';
import { TrancheTextMap, TrancheType } from '@types';
import { showNotification } from '@utils/notification';
import { getExplorerLink } from '@utils/transaction';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import EnterAmountStep from './Steps/EnterAmountStep';

type IProps = ModalProps & {
  collection: string;
  tranche: TrancheType;
};

const WithdrawalModal: React.FC<IProps> = ({
  collection,
  tranche,
  onClose,
  ...props
}) => {
  const { address } = useAccount();
  const {
    data: reserve = DEFAULT_RESERVE_STATE,
    isLoading,
    refetch,
  } = useReserve(collection, address);
  const onWithdrawn = async (receipt: ethers.providers.TransactionReceipt) => {
    onClose();
    showNotification({
      title: 'Withdrawal success',
      message: `Your withdrawal was successful`,
      type: 'success',
      link: getExplorerLink(receipt.transactionHash),
    });
    await refetch();
  };

  return (
    <Modal
      title={`Withdraw from ${TrancheTextMap[tranche]} Tranche`}
      centered
      onClose={onClose}
      {...props}
    >
      <LoadingOverlay visible={isLoading} />
      <EnterAmountStep
        reserve={reserve}
        tranche={tranche}
        onSuccess={onWithdrawn}
      />
    </Modal>
  );
};

export default WithdrawalModal;
